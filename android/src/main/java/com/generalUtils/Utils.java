package com.generalUtils;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.preference.PreferenceManager;
import android.support.annotation.Nullable;
import android.util.DisplayMetrics;

import android.view.View;
import com.baseLibs.BaseApplication;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;

public class Utils {
    public static boolean isOnline() {
        Context mContext = BaseApplication.getAppContext();
        ConnectivityManager cm = (ConnectivityManager) mContext.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        if (netInfo != null && netInfo.isConnectedOrConnecting()) {
            return true;
        }
        return false;
    }

    public static void saveLongSetting(String pKey, long pValue) {
        SharedPreferences.Editor mEditor = PreferenceManager.getDefaultSharedPreferences(BaseApplication.getAppContext()).edit();
        mEditor.putLong(pKey, pValue);
        mEditor.apply();
    }

    public static Long getLongSetting(String pKey, long mDefaultValue) {
        SharedPreferences mSharePreferences = PreferenceManager.getDefaultSharedPreferences(BaseApplication.getAppContext());
        long mValue = mSharePreferences.getLong(pKey, mDefaultValue);
        return mValue;
    }

    public static int convertDpToPixel(float dp) {
        Resources resources = BaseApplication.getAppContext().getResources();
        DisplayMetrics metrics = resources.getDisplayMetrics();
        float px = dp * (metrics.densityDpi / 160f);
        return (int) px;
    }

    /**
     * WritableMap writableMap = Arguments.createMap();
     */
    public static void sendEvent(ReactContext reactContext, String eventName, @Nullable Object params) {
        if (reactContext == null) return;
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    public static void sendEvent(String name, View view, @Nullable WritableMap event) {
        ReactContext reactContext = (ReactContext) view.getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                view.getId(),
                name,
                event);
    }
}
