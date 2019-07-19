package com.generalUtils.commonUtils;

import com.generalUtils.commonUtils.encodeDecode.StringEncodeUtils;

import java.security.MessageDigest;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class Encryption {

    private SecretKeySpec skeySpec;
    private Cipher cipher;
    private static Encryption mEncryption;
    private static Encryption mEncryption1;

    public static Encryption getInstance() throws Exception {
        if (mEncryption == null) {
            byte[] key = new byte[16];
            key[0] = (byte) 'Q';
            key[1] = (byte) 'H';
            key[3] = (byte) 'F';
            key[4] = (byte) 'E';
            mEncryption = new Encryption(key);
        }
        return mEncryption;
    }

    public static Encryption getInstance1() throws Exception {
        if (mEncryption1 == null) {
            byte[] key = new byte[16];
            key[0] = (byte) 'Q';
            key[1] = (byte) 'H';
            key[3] = (byte) 'F';
            mEncryption1 = new Encryption(key);
        }
        return mEncryption1;
    }

    public static String decrypt(String source) {
        try {
            Encryption enc = getInstance();
            byte[] decrypted = enc.decrypt(StringEncodeUtils.toByte(source));
            return new String(decrypted, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Encryption(byte[] keyraw) throws Exception {
        if (keyraw == null) {
            byte[] bytesOfMessage = "".getBytes("UTF-8");
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] bytes = md.digest(bytesOfMessage);

            skeySpec = new SecretKeySpec(bytes, "AES");
            cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        } else {

            skeySpec = new SecretKeySpec(keyraw, "AES");
            cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");

        }
    }

    public Encryption(String passphrase) throws Exception {
        byte[] bytesOfMessage = passphrase.getBytes("UTF-8");
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] thedigest = md.digest(bytesOfMessage);
        skeySpec = new SecretKeySpec(thedigest, "AES");

        cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
    }

    public Encryption() throws Exception {
        byte[] bytesOfMessage = "".getBytes("UTF-8");
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] thedigest = md.digest(bytesOfMessage);
        skeySpec = new SecretKeySpec(thedigest, "AES");

        skeySpec = new SecretKeySpec(new byte[16], "AES");
        cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
    }

    public byte[] encrypt(byte[] plaintext) throws Exception {
        if (plaintext == null)
            return null;
        // returns byte array encrypted with key

        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);

        byte[] ciphertext = cipher.doFinal(plaintext);

        return ciphertext;
    }

    public byte[] decrypt(byte[] ciphertext) throws Exception {
        if (ciphertext == null)
            return null;
        // returns byte array decrypted with key
        cipher.init(Cipher.DECRYPT_MODE, skeySpec);

        byte[] plaintext = cipher.doFinal(ciphertext);

        return plaintext;
    }

    // public static void main(String[] args) throws Exception {
    //
    // String message="Hồ Quang Hiểu";
    // byte[] key = new byte[16];
    // key[0] = (byte)'Q';
    // key[1] = (byte)'H';
    // Encryption encrypter = new Encryption(key);
    //
    // byte[] encrypted = encrypter.encrypt(message.getBytes("UTF-8"));
    // byte[] decrypted = encrypter.decrypt(encrypted);
    //
    // System.out.println(new String (encrypted, "UTF-8"));
    // System.out.println(new String (decrypted, "UTF-8"));
    //
    // }
}
