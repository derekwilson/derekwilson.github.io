## Kotlin, Dagger2 and Butterknife

I have started a new app. I know I have [written about setting up an app to use Dagger2][previous-post-url] in the past but this time I am using [Dagger2][dagger-url] and [Butterknife][butterknife-url] with [Android Studio 3][as3-url] and [Kotlin][]kotlin-url. Dagger2 and Butterknife are not new and are well documented but using them in a Kotlin app was less well documented as I setup this app.

There are some things that I needed to get used to before I could make any real progress.

### kotlin plugin

As [Android Studio adopts Kotlin][kotlin-android-url] as an officially supported language for Android development the plugin and the runtime appear to be release more often at the moment. As a consequence you will see this kind of error message.

```
Your version of Kotlin runtime in 'kotlin-stdlib-1.1.3-2' library is 1.1.3-2, while plugin version is 1.1.4-release-Studio2.3-3.
Runtime library should be updated to avoid compatibility problems.
Update Runtime Ignore
```

Android Studio can and will update the plugin automatically, or allow you to do it at the click of a toast popup however the runtime is up to you to sort out.

It wasn't completely obvious but the numbers need to match up to the suffix staring with `-release-Studio`. You need to change the line in your gradle file, which by default is at the top of the top level `build.gradle` file. In this instance I change the file to look like this.

```
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
	ext.kotlin_version = '1.1.4'
	repositories {
```

As of version 1.1.50 the format has changed to eliminate any hyphens so no more 1.1.x-y instead it will be 1.1.xy, which is a bit clearer given that the plugin suffix can contain hyphens.


### kapt errors are a mess

The annotations processor for Kotlin (KAPT) does not integrate well into Android Studio in the sense that the error messages are easily missed.

Usually this is not a problem but Dagger2 relies heavily on KAPT and all too often will generate an error. In that instance all you will see is

```
Error:Execution failed for task ':app:kaptDebugKotlin'. > Internal compiler error. See log for more details
```

You may see more information by going to File -> Settings -> Compiler and adding `--stacktrace --debug` to the command line options

Also you can build from the command line, or examine the gradle console window in Android Studio, with will yeild more information, some of it should help, for example

```
gradlew build --stacktrace

:app:kaptDebugKotlin
e: ...\di\scopes\MainActivityModule.java:15: error: @Provides methods cannot be abstract
e:
e:     public abstract com.andrewandderek.mapspoc.activity.main.IMainActivityPresenter provideMainActivityPresenter$app_debug(@org.jetbrains.annotations.NotNull()
e:                                                                                     ^
e: ...\di\scopes\IMainActivitySubComponent.java:4: error: com.andrewandderek.mapspoc.di.scopes.MainActivityModule has errors
e:
e: @dagger.Subcomponent(modules = {com.andrewandderek.mapspoc.di.scopes.MainActivityModule.class})
e: ^
e: java.lang.IllegalStateException: failed to analyze: org.jetbrains.kotlin.kapt3.diagnostic.KaptError: Error while annotation processing
        at org.jetbrains.kotlin.analyzer.AnalysisResult.throwIfError(AnalysisResult.kt:57)
        at org.jetbrains.kotlin.cli.jvm.compiler.KotlinToJVMBytecodeCompiler.compileModules(KotlinToJVMBytecodeCompiler.kt:144)
        at org.jetbrains.kotlin.cli.jvm.K2JVMCompiler.doExecute(K2JVMCompiler.kt:167)
        at org.jetbrains.kotlin.cli.jvm.K2JVMCompiler.doExecute(K2JVMCompiler.kt:55)
        at org.jetbrains.kotlin.cli.common.CLICompiler.exec(CLICompiler.java:182)
        at org.jetbrains.kotlin.daemon.CompileServiceImpl.execCompiler(CompileServiceImpl.kt:397)
```

### Package error after updating to Android Studio 3

I also found this error

```
Error:Execution failed for task ':app:transformResourcesWithMergeJavaResForDebug'.
More than one file was found with OS independent path 'META-INF/app_debug.kotlin_module'
```

There were suggestions that I could reload the cache, however that didnt help in this instance. In the end I excluded the file in the package options like this

```
android {
	compileSdkVersion 25
	buildToolsVersion '26.0.2'

	....
	
	packagingOptions {
		exclude 'META-INF/app_debug.kotlin_module'
	}
}
```

### Using Dagger.Android

As I was building a new app I wanted to use the latest offering from Dagger2 and there now is the new `Dagger.Android` package which should make injecting Android objects, such as Activity, Service, Fragment etc. easier with less boilerplate code in the app.

There are a number of small pieces that I ended up doing to get it to work, this is the code from my first cur proof of concept, I was just trying to get everything working, there are parts that needed tweaking as I produced a more polished version.

#### In the application

The root setup of the IoC container happens int eh application. 

```
class AndroidApplication : Application(), HasActivityInjector
{
    // Deliberately not using IoC for this - as we want to log setting up IoC
    private val logger = LoggerFactory.getLogger(AndroidApplication::class.java)

    @Inject lateinit var injectedLogger: IApplicationLoggerFactory
    @Inject lateinit var activityInjector: DispatchingAndroidInjector<Activity>

    override fun activityInjector(): AndroidInjector<Activity> {
        return activityInjector
    }

	// this is the root IoC container
    val component: IApplicationComponent by lazy {
        DaggerIApplicationComponent
                .builder()
                .applicationModule(ApplicationModule(this))
                .build()
    }

    override fun onCreate() {
        logger.debug("POC: Application started - shared")
        component.inject(this)
        injectedLogger.applicationLogger.debug("POC: IoC container build complete")

        super.onCreate()

        ButterKnife.setDebug(BuildConfig.DEBUG)
    }
}
```

We emit one log entry directly and then after injection as happened we emit one line using the injected logger.

We are well used to seeing `component.inject(this)` boiler plate code in Activities from using Dagger2 in Java. However when we use `Dagger.Android` this is the only class that we explicitly create a component and inject, Dagger will handle a lot of the legwork in the Activity classes.

#### In the Activity

The activity class is much simpler than using old style Dagger2

```
class MainActivity :
        AppCompatActivity(),
        IMainActivityView
{
    @Inject lateinit var presenter: IMainActivityPresenter
    @Inject lateinit var logger: IApplicationLoggerFactory

    override fun onCreate(savedInstanceState: Bundle?) {
        AndroidInjection.inject(this)
        logger.applicationLogger.debug("Main activity started")
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
		....
    }
```

We still call inject by calling `AndroidInjection.inject(this)` but that is the only line required to get injection to work.

#### The Component and Module

To get this to happen I had to setup the component and module slightly differently than I had done for previous projects.

##### Global scoped singletons

The global module looks like this

```
@Singleton
@Component(modules = arrayOf(
        AndroidSupportInjectionModule::class,
        SubcomponentBuilderModule::class,       // the activity (view) subcomponent injectors, binding is automatic
        ApplicationModule::class))              // global singleton objects
interface IApplicationComponent {
    fun inject(app: AndroidApplication)
}

/**
 * This module contains all the binding to the sub component builders in the app
 */
@Module
abstract class SubcomponentBuilderModule {
    @Binds
    @IntoMap
    @ActivityKey(MainActivity::class)
    abstract fun bindMainActivityInjectorFactory(builder: IMainActivitySubComponent.Builder): AndroidInjector.Factory<out Activity>
}

// do not forget to add any additional subcomponents here
@Module(subcomponents = arrayOf(IMainActivitySubComponent::class)
class ApplicationModule(val application: AndroidApplication) {
    @Provides
    @Singleton
    fun provideApplicationContext() : Context = application.applicationContext

    @Provides
    @Singleton
    fun provideLogger(loggerFactory: SlfLoggerFactory): IApplicationLoggerFactory {
        return loggerFactory
    }
}
```

##### Activity scoped objects

Then the activity has a module that looks like this.

```
@ActivityScope
@Subcomponent(modules = arrayOf(MainActivityViewModule::class))
interface IMainActivitySubComponent : AndroidInjector<MainActivity> {
    @Subcomponent.Builder
    abstract class Builder : AndroidInjector.Builder<MainActivity>()
}

@Module(includes = arrayOf(MainActivityModule::class))
abstract class MainActivityViewModule {
    @Binds
    internal abstract fun provideMainActivityView(activity: MainActivity): IMainActivityView
}

// we cannot mix provide and bind methods in one module
@Module
class MainActivityModule {
    @Provides
    @ActivityScope
    fun provideMainActivityPresenter(presenter: MainActivityPresenter): IMainActivityPresenter {
        return presenter
    }
}

```

The IMainActivitySubComponent satisfies the promise we made in SubcomponentBuilderModule if we do not provide a `AndroidInjector.Builder<MainActivity>` then we will get a compilation error. 

Usually we only have one `@Module` however in kotlin you cannot mix `@Binds` and `@Provides` in the same class as `@Binds` requires the class to be abstract. In Java we can get around this by using `static` but here in kotlin we needed to have a `@Module` made up from two classes.

### Butterknife

There only extra piece I needed to get Butterknife to work was to make sure I used `@JvmField` like this. I decided that I would use the mature Butterknife rather than [Kotterknife][kotterknife-url].

```
@JvmField @BindView(R.id.txt_status)
protected var status: TextView? = null

override fun onCreate(savedInstanceState: Bundle?) {
    AndroidInjection.inject(this)
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_diagnostics)
    ButterKnife.bind(this)
    presenter.setupScreen()
}
```

### The future

Like I said this was a first proof of concept and it does need some tidying up. I have read that putting all the builder in on subcomponent like I have done in `SubcomponentBuilderModule` isnt great as it imposes the same scope on them all. Also I should prefer `@Bind` over `@Provide` as in most cases I dont need `@Provide`. I will revisit this.

[previous-post-url]:	/blog/2015/11/12/an-mvp-pattern-using-scoped-dagger2-ioc-containers
[dagger-url]:			https://google.github.io/dagger/
[butterknife-url]:		http://jakewharton.github.io/butterknife/
[kotterknife-url]:		https://github.com/JakeWharton/kotterknife
[as3-url]:				https://android-developers.googleblog.com/2017/10/android-studio-30.html
[kotlin-url]:			https://kotlinlang.org/
[kotlin-android-url]:	https://developer.android.com/kotlin/index.html

