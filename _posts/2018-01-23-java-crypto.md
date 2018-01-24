---
layout: post
title: "Java crypto"
date: 2018-01-23 12:00:00
published: true
tags: ["Android", "Development", "Java"]
categories: ["Android", "Development", "Java"]
---

I came across an interesting problem recently. There was a bug where a payload was being transmitted - except that some combinations never made the trip. The bug appeared to be that some combinations were not working, in fact the suspicion was that there was something not right on Android Orea.

I had a look and it took a while but in the end I found that the problem was that as part of the transmission the payload was encrypted and decrypted and that was the problem.

I've stripped down the code but the core of it was this pair of routines. As is hopefully usual we dont roll our own crypto but use the library supplied one from java.security, we are encrypting with our private key and decrypting with our public key - all very usual so far.

{% highlight Java linenos %}
private static final String Rsa_Cipher_Transformation = "RSA";

public static final byte[] encryptWithPrivateKey(byte[] bytes, RSAPrivateKeySpec privateKey) {
	KeyFactory kf = KeyFactory.getInstance("RSA");
	Cipher cipher = Cipher.getInstance(Rsa_Cipher_Transformation);
	cipher.init(Cipher.ENCRYPT_MODE, kf.generatePrivate(privateKey));
	return cipher.doFinal(bytes);
}

public static final byte[] decryptWithPublicKey(byte[] bytes, PublicKey publicKey) {
	Cipher cipher = Cipher.getInstance(Rsa_Cipher_Transformation);
	cipher.init(Cipher.DECRYPT_MODE, publicKey);
	return cipher.doFinal(bytes);
}
{% endhighlight %}

I knew that a particular payload on Orea triggered the problem, I could put a breakpoint down and capture the `byte[]` being encrypted. I did that and then wrote a unit test. I could text on the standard JVM as we were using java.security packages so when I did this

{% highlight Java linenos %}
 @Test
public void testEncryptAndDecrypt_WithLeadingNull() {
	byte[] data = generateTestData_2();
	byte[] encrypted = CryptoUtil.encryptWithPrivateKey(data, privateKey);
	byte[] decrypted = CryptoUtil.decryptWithPublicKey(encrypted, publicKey);
	assertThat(decrypted, is(data));
}

 private static byte[] generateTestData_2() {
	byte[] result = new byte[20];
	result[0] = 0;
	result[1] = -11;
	result[2] = 78;
	result[3] = -26;
	result[4] = -103;
	result[5] = -22;
	result[6] = 95;
	result[7] = 6;
	result[8] = -53;
	result[9] = -127;
	result[10] = -55;
	result[11] = 117;
	result[12] = 21;
	result[13] = 46;
	result[14] = -33;
	result[15] = 22;
	result[16] = -12;
	result[17] = -22;
	result[18] = 109;
	result[19] = 90;
	return result;
}
{% endhighlight %}

I got the following error

```
java.lang.AssertionError:
Expected: is [<0>, <-11>, <78>, <-26>, <-103>, <-22>, <95>, <6>, <-53>, <-127>, <-55>, <117>, <21>, <46>, <-33>, <22>, <-12>, <-22>, <109>, <90>]
 	but: was [<-11>, <78>, <-26>, <-103>, <-22>, <95>, <6>, <-53>, <-127>, <-55>, <117>, <21>, <46>, <-33>, <22>, <-12>, <-22>, <109>, <90>]
```
It was this specific payload - and the thing that jumps straight off the page is that the payload starts with a zero byte.

I went back to reading the crypto documents and I did notice that the [Oracle specification][oracle-crypto-url] only allowed the following RSA transformations

```
RSA/ECB/PKCS1Padding (1024, 2048)
RSA/ECB/OAEPWithSHA-1AndMGF1Padding (1024, 2048)
RSA/ECB/OAEPWithSHA-256AndMGF1Padding (1024, 2048)
```
Pretty much on a hunch - but armed with my new units tests I changed the transformation we were using to be

```
private static final String Rsa_Cipher_Transformation = "RSA/ECB/PKCS1Padding";
```

The tests passed and the code ran correctly on Android as well.

[oracle-crypto-url]:		https://docs.oracle.com/javase/7/docs/api/javax/crypto/Cipher.html
