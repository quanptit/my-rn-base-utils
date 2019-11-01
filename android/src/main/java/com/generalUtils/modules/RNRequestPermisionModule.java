package com.generalUtils.modules;

import android.Manifest;
import android.app.Activity;
import android.content.DialogInterface;

import androidx.annotation.NonNull;

import com.baseLibs.BaseReactActivtiy;
import com.baseLibs.utils.DialogUtils;
import com.baseLibs.utils.permisions.RequestAppPermissions;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.generalUtils.R;

public class RNRequestPermisionModule extends ReactContextBaseJavaModule {
    public RNRequestPermisionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override public String getName() {
        return "RNRequestPermisionModule";
    }

    @ReactMethod
    public void requestAudioPermision(final Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity == null) activity = BaseReactActivtiy.getInstance();
        if (activity == null) {
            promise.reject("1", "activity Null");
            return;
        }
        final Runnable runnablePermisioAllowRecord = new Runnable() {
            @Override public void run() {
                promise.resolve(true);
            }
        };
        if (RequestAppPermissions.isGrandPermision(Manifest.permission.RECORD_AUDIO)) {
            runnablePermisioAllowRecord.run();
            return;
        }
        final Activity finalActivity = activity;
        DialogUtils.buildDialog(activity)
                .setTitle(R.string.enable_permission_audio)
                .setMessage(R.string.enable_permission_audio_ghi_am)
                .setCancelable(false)
                .setPositiveButton(R.string.enable_permission_audio, new DialogInterface.OnClickListener() {
                    @Override public void onClick(DialogInterface dialog, int which) {
                        final long startTimeRequesPermision = System.currentTimeMillis();
                        dialog.dismiss();
                        Runnable runnablePermisionDeniedRecord = new Runnable() {
                            @Override public void run() {
                                if (System.currentTimeMillis() - startTimeRequesPermision < 1000) {// Luôn từ chối (user chọn không hỏi lại)
                                    RequestAppPermissions.openAppSettingPage(finalActivity);
                                } else {
                                    DialogUtils.showInfoDialog(finalActivity, R.string.permission_denied_audio,
                                            false);
                                }
                                promise.reject("2", "Permision Denied");
                            }
                        };

                        RequestAppPermissions.excuteAfterRequestPermisionStatic(finalActivity,
                                Manifest.permission.RECORD_AUDIO, null,
                                runnablePermisioAllowRecord, runnablePermisionDeniedRecord);
                    }
                })
                .show();
    }

    @ReactMethod
    public void requestSpeakPermision(final Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity == null) activity = BaseReactActivtiy.getInstance();
        if (activity == null) {
            promise.reject("1", "activity Null");
            return;
        }
        final Runnable runnablePermisioAllowRecord = new Runnable() {
            @Override public void run() {
                promise.resolve(true);
            }
        };
        if (RequestAppPermissions.isGrandPermision(Manifest.permission.RECORD_AUDIO)) {
            runnablePermisioAllowRecord.run();
            return;
        }
        final Activity finalActivity = activity;
        DialogUtils.buildDialog(activity)
                .setTitle(R.string.enable_permission_audio)
                .setMessage(R.string.enable_permission_audio_mesg)
                .setCancelable(false)
                .setPositiveButton(R.string.enable_permission_audio, new DialogInterface.OnClickListener() {
                    @Override public void onClick(DialogInterface dialog, int which) {
                        final long startTimeRequesPermision = System.currentTimeMillis();
                        Runnable runnablePermisionDeniedRecord = new Runnable() {
                            @Override public void run() {
                                if (System.currentTimeMillis() - startTimeRequesPermision < 1000) {// Luôn từ chối (user chọn không hỏi lại)
                                    RequestAppPermissions.openAppSettingPage(finalActivity);
                                } else {
                                    DialogUtils.showInfoDialog(finalActivity, R.string.permission_denied_audio,
                                            false);
                                }
                                promise.reject("2", "Permision Denied");
                            }
                        };

                        RequestAppPermissions.excuteAfterRequestPermisionStatic(finalActivity,
                                Manifest.permission.RECORD_AUDIO, null,
                                runnablePermisioAllowRecord, runnablePermisionDeniedRecord);
                    }
                }).show();
    }
}
