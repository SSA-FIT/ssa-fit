package com.ssafy.ssafit.util;

import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class CryptUtil {

    /** Aes 인스턴스 */
    public static Aes aes = new Aes();

    /** Aes 인스턴스를 반환한다. */
    public static Aes getAES() {
        return aes;
    }//:

    /**
     * AES 암호화를 지원한다.  암호화를 위한 키는 16바이트여야 한다.
     */
    public static class Aes {
        /**
         * 문자열을 암호화 한다.
         *
         * @param strToEncrypt  암호화할 문자열
         * @return
         * 		암호화된 문자열을 바이트 배열로 반환한다.
         * @throws Exception
         */

        public byte[] encryptToBytes(String strToEncrypt) throws Exception  {
            String key = "heightWeightBmi1";
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            return cipher.doFinal(strToEncrypt.getBytes("UTF-8"));

        }//:

        /**
         * 문자열을 암호화 한다.
         *
         * @param strToEncrypt  암호화할 문자열
         * @return
         * 		암호화된 문자열을 base64로 encode해서  반환한다
         * @throws Exception
         */
        public String encrypt(String strToEncrypt) throws Exception  {
            String encryptedStr = Base64.getEncoder().encodeToString(encryptToBytes(strToEncrypt));
            return encryptedStr;
        }//:

        /**
         * 암호화된 바이트 배열을 복호화 한다.
         *
         * @param bytesToDecrypt  복호화할 바이트 배열
         * @return
         * 		복호화된 바이트 배열
         * @throws Exception
         */
        public byte[] decryptToBytes(byte[] bytesToDecrypt) throws Exception {
            String key = "heightWeightBmi1";
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            return  cipher.doFinal(bytesToDecrypt);
        }//:


        /**
         * Base 64로 감싸진 문자열을 복호화 한다.
         *
         * @param strToDecrypt  복호화할 문자열
         * @return
         * 		복호화된 문자열
         * @throws Exception
         */
        public String decrypt(String strToDecrypt) throws Exception {
            byte[] bytesToDecrypt = Base64.getDecoder().decode(strToDecrypt);
            String decreptedStr = new String(decryptToBytes(bytesToDecrypt));
            return decreptedStr;
        }//:
    }///~ AES
}