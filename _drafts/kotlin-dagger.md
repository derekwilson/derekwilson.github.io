### kotlin plugin

Your version of Kotlin runtime in 'kotlin-stdlib-1.1.3-2' library is 1.1.3-2, while plugin version is 1.1.4-release-Studio2.3-3.
Runtime library should be updated to avoid compatibility problems.
Update Runtime Ignore

	ext.kotlin_version = '1.1.3-2'

	ext.kotlin_version = '1.1.4'


### kapt errors are a mess

```
Error:Execution failed for task ':app:kaptDebugKotlin'. > Internal compiler error. See log for more details
```

File -> Settings -> Compiler

```
--stacktrace --debug
```

Command line

```
gradlew build --stacktrace
```

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


### AS3

Error:Execution failed for task ':app:transformResourcesWithMergeJavaResForDebug'.
More than one file was found with OS independent path 'META-INF/app_debug.kotlin_module'


10:24	Outdated Kotlin Runtime
			Your version of Kotlin runtime in 'org.jetbrains.kotlin:kotlin-stdlib:1.1.4@jar' library is 1.1.4, while plugin version is 1.1.51-release-Studio3.0-1.
			Runtime library should be updated to avoid compatibility problems.
			Update Runtime Ignore

reload cache didnt work

	// dagger
	kapt 'com.google.dagger:dagger-compiler:2.11'
	kapt 'com.google.dagger:dagger-android-processor:2.11'
	compile 'com.google.dagger:dagger:2.11'
	compile 'com.google.dagger:dagger-android-support:2.11'

->

	compile 'com.google.dagger:dagger:2.11'
	annotationProcessor 'com.google.dagger:dagger-compiler:2.11'
	compile 'com.google.dagger:dagger-android:2.11'
	compile 'com.google.dagger:dagger-android-support:2.11'
	annotationProcessor 'com.google.dagger:dagger-android-processor:2.11'



android {
	compileSdkVersion 25
	buildToolsVersion '26.0.2'
	defaultConfig {
		applicationId "com.andrewandderek.mapspoc"
		minSdkVersion 14
		targetSdkVersion 25
		versionCode 1
		versionName "1.0"
		testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
		multiDexEnabled true
	}
	buildTypes {
		release {
			minifyEnabled false
			proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
		}
	}

	//Although Gradle will compile any Kotlin files it finds in src/main/java, it’s good practice to store your Kotlin files in a dedicated Kotlin directory. Here, you can see that the Kotlin plugin has added a src/main/kotlin declaration to build.gradle, but note that it hasn’t actually created this directory, so we’ll create it ourselves later in this article//
	sourceSets {
		main.java.srcDirs += 'src/main/kotlin'
		release.java.srcDirs += 'src/release/kotlin'
		debug.java.srcDirs += 'src/debug/kotlin'
	}

	packagingOptions {
		exclude 'META-INF/app_debug.kotlin_module'
	}
}


