    open inner class LocalBinder : Binder() {
        open fun getService() : IGpsLoggerService
        {
            return this@GpsLoggerService
        }
        **open** fun getNumber() : Int
        {
            return 11
        }
    }

    protected lateinit var mockbinder: GpsLoggerService.LocalBinder
    mockbinder = mock(GpsLoggerService.LocalBinder::class.java)
    Mockito.`when`(mockbinder.getNumber()).thenReturn(99)


org.mockito.exceptions.misusing.CannotStubVoidMethodWithReturnValue: 
'debug' is a *void method* and it *cannot* be stubbed with a *return value*!
Voids are usually stubbed with Throwables:
    doThrow(exception).when(mock).someVoidMethod();
If you need to set the void method to do nothing you can use:
    doNothing().when(mock).someVoidMethod();
For more information, check out the javadocs for Mockito.doNothing().