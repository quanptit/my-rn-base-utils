package com.generalUtils.commonUtils;

import android.content.Context;
import android.content.res.AssetManager;
import android.text.TextUtils;
import com.baseLibs.BaseApplication;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;

public class FileUtils {
    public static String readAcessFile(String filePath, boolean isDecrypt) throws Exception {
        if (isDecrypt) {
            Encryption encryption = Encryption.getInstance();
            byte[] decrypted = encryption.decrypt(readAcessFileToBytes(BaseApplication.getAppContext(), filePath));
            return new String(decrypted, "UTF-8");
        }

        InputStream localInputStream = BaseApplication.getAppContext().getAssets().open(filePath, AssetManager.ACCESS_STREAMING);
        Writer writer = new StringWriter();
        char[] buffer = new char[1024];
        Reader reader;
        reader = new BufferedReader(new InputStreamReader(localInputStream, "UTF-8"));
        int n;
        while ((n = reader.read(buffer)) != -1) {
            writer.write(buffer, 0, n);
        }
        localInputStream.close();
        return writer.toString();
    }

    private static byte[] readAcessFileToBytes(Context context, String fileName) {
        try {
            InputStream localInputStream = context.getAssets().open(fileName, AssetManager.ACCESS_STREAMING);
            byte[] fileData = new byte[(int) localInputStream.available()];
            DataInputStream dis = new DataInputStream(localInputStream);
            dis.readFully(fileData);
            dis.close();
            return fileData;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Copy files in assetFolderPath to sdcardFolder
     *
     * @param assetFolderPath : ie: sample1 , sample1/sample2
     * @throws Exception
     */

    public static void copyAssetFolderToSdCard(String assetFolderPath, String sdcardFolder) throws Exception {
        AssetManager assetManager = BaseApplication.getAppContext().getAssets();
        String assets[] = null;
        assets = assetManager.list(assetFolderPath) ;
        if (assets.length == 0) {
            copyAssetFileToSdCard(assetFolderPath, sdcardFolder);
        } else {
            for (int i = 0; i < assets.length; ++i) {
                copyAssetFolderToSdCard(assetFolderPath + "/" + assets[i], sdcardFolder);
            }
        }
    }

    /**
     * Copy filename to sdcardFolder
     *
     * @param assetFilename : i.e., "docs/home.html".
     */
    public static void copyAssetFileToSdCard(String assetFilename, String sdcardFolder) throws Exception {
        File f = new File(sdcardFolder);
        if (!f.exists())
            f.mkdirs();
        String newFileName = sdcardFolder + "/" + FileUtils.getFileNameFromPath(assetFilename);
        if (FileUtils.exists(newFileName))
            return;

        InputStream in = null;
        OutputStream out = null;
        AssetManager assetManager = BaseApplication.getAppContext().getAssets();
        in = assetManager.open(assetFilename);
        out = new FileOutputStream(newFileName);

        byte[] buffer = new byte[1024];
        int read;
        while ((read = in.read(buffer)) != -1) {
            out.write(buffer, 0, read);
        }
        in.close();
        in = null;
        out.flush();
        out.close();
        out = null;
    }

    public static String getFileNameFromPath(String path) {
        if (!TextUtils.isEmpty(path)) {
            path = path.substring(1 + TextUtils.lastIndexOf(path, '/'), path.length());
            return path;
        }
        return path;
    }

    public static boolean exists(String filePath) {
        if (filePath == null)
            return false;
        File f = new File(filePath);
        return f.exists();
    }
}
