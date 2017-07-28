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
