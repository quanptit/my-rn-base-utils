package com.generalUtils.modules;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetFileDescriptor;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.speech.tts.TextToSpeech;
import com.baseLibs.BaseApplication;
import com.generalUtils.commonUtils.FileUtils;
import com.baseLibs.utils.PreferenceUtils;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.util.Locale;

public class RNCommonUtilsModule extends ReactContextBaseJavaModule {
    private MediaPlayer player = null;
    private Callback callbackQuitPlayScreen;
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == 333) {
                if (callbackQuitPlayScreen != null) {
                    callbackQuitPlayScreen.invoke();
                    callbackQuitPlayScreen = null;
                }
            }
        }
    };

    public RNCommonUtilsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "RNCommonUtilsAndroid";
    }

    @ReactMethod
    public void playSoundAssetFile(String fileAssetPath, float volume) {
        try {
            Context context = BaseApplication.getAppContext();
            AssetFileDescriptor afd = context.getAssets().openFd(fileAssetPath);
            if (player == null)
                player = new MediaPlayer();
            else {
                player.reset();
            }
            if (volume > 0)
                player.setVolume(volume, volume);
            player.setAudioStreamType(AudioManager.STREAM_MUSIC);
            player.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
            player.prepareAsync();
            player.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    mp.start();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

//    @ReactMethod
//    public void copyResource(final Promise promise) {
//        if (PreferenceUtils.getBooleanSetting("COPIED_RESOURCE")) {
//            UiThreadUtil.runOnUiThread(new Runnable() {
//                @Override
//                public void run() {
//                    promise.resolve(true);
//                }
//            });
//            return;
//        }
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                try {
//                    FileUtils.copyAssetFolderToSdCard("data/voca_image_quiz", getReactApplicationContext().getFilesDir().getAbsolutePath() + "/download/voca_image_quiz");
//                    UiThreadUtil.runOnUiThread(new Runnable() {
//                        @Override
//                        public void run() {
//                            PreferenceUtils.saveBooleanSetting("COPIED_RESOURCE", true);
//                            promise.resolve(true);
//                        }
//                    });
//                } catch (Exception e) {
//                    e.printStackTrace();
//                    UiThreadUtil.runOnUiThread(new Runnable() {
//                        @Override
//                        public void run() {
//                            promise.resolve(false);
//                        }
//                    });
//                }
//            }
//        }).start();
//    }

    @ReactMethod
    public void openAppFromMarket(String packageName) {
        if (packageName == null) {
            packageName = BaseApplication.getAppContext().getPackageName();
        }
        try {
            Intent LaunchIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + packageName));
            LaunchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            BaseApplication.getAppContext().startActivity(LaunchIntent);
        } catch (android.content.ActivityNotFoundException anfe) {
            Intent LaunchIntent = new Intent(Intent.ACTION_VIEW, Uri
                    .parse("http://play.google.com/store/apps/details?id=" + packageName));
            LaunchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            BaseApplication.getAppContext().startActivity(LaunchIntent);
        }
    }

    @ReactMethod
    public void launchInstalled(String packageName) {
        Intent LaunchIntent = BaseApplication.getAppContext().getPackageManager().getLaunchIntentForPackage(packageName);
        LaunchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        LaunchIntent.putExtra("IS_FROM_OTHER_APP", true);
        BaseApplication.getAppContext().startActivity(LaunchIntent);
    }

    @ReactMethod
    public void isAppInstalled(String packageName, Callback callback) {
        Intent mIntent = BaseApplication.getAppContext().getPackageManager().getLaunchIntentForPackage(packageName);
        if (mIntent != null) {
            callback.invoke(true);
        } else {
            callback.invoke(false);
        }
    }

    @ReactMethod
    public void readFileFromAssetFolder(String fileSubPath, boolean isDecrypt, Callback callbackSuccess, Callback callbackError) {
        try {
            String str = FileUtils.readAcessFile(fileSubPath, isDecrypt);
            callbackSuccess.invoke(str);
        } catch (Exception e) {
            e.printStackTrace();
            callbackError.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void setVIPUser() {
        PreferenceUtils.saveBooleanSetting("IS_VIP", true);
    }

    @ReactMethod
    public void isVIPUser(Promise promise) {
        promise.resolve(PreferenceUtils.getBooleanSetting("IS_VIP", false));
    }

    @ReactMethod
    public void saveIntPreference(String key, int value) {
        PreferenceUtils.saveIntSetting(key, value);
    }

    @ReactMethod
    public void getCurrentLanguageCode(Promise promise) {
        promise.resolve(Locale.getDefault().getLanguage());
    }

    @ReactMethod
    public void openTTSIntentInstallData() {
        Intent installIntent = new Intent();
        installIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        installIntent.setAction(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA);
        getReactApplicationContext().startActivity(installIntent);
    }

    @ReactMethod
    public void lastModified(String filePath, Promise promise) {
        try {
            File file = new File(filePath);
            if (file.exists()) {
                float time = (file.lastModified() / (float) 1000);
                promise.resolve(time);
            } else
                promise.resolve(0);
        } catch (Exception e) {
            e.printStackTrace();
            promise.resolve(0);
        }
    }

    @ReactMethod
    public void getAppName(Promise promise) {
        Context context = getReactApplicationContext();
        String value = context.getApplicationInfo().loadLabel(context.getPackageManager()).toString();
        promise.resolve(value);
    }

    @ReactMethod
    public void getBoolPref(String pKey, Promise promise) {
        promise.resolve(PreferenceUtils.getBooleanSetting(pKey));
    }

    // region method phục vụ cho việc update =====
    // promise là int value
    @ReactMethod
    public void getScore(String key, Promise promise) {
        int value = PreferenceUtils.getIntSetting(key);
        promise.resolve(value);
    }

    @ReactMethod
    public void getTwoScore(String key1, String key2, Promise promise) {
        int value1 = PreferenceUtils.getIntSetting(key1);
        int value2 = PreferenceUtils.getIntSetting(key2);
        WritableMap map = Arguments.createMap();
        map.putInt("value1", value1);
        map.putInt("value2", value2);
        promise.resolve(map);
    }
    // endregion
}
