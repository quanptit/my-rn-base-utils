package com.generalUtils;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.view.Window;

import com.afollestad.materialdialogs.MaterialDialog;

public class DialogUtils {

    public static void showInfoDialog(Context mContext, String messageStr, DialogInterface.OnClickListener positive) {
        AlertDialog.Builder builder = new AlertDialog.Builder(mContext);
        messageStr = "\n" + messageStr + "\n";
        builder.setMessage(messageStr);
        builder.setPositiveButton("OK", positive);
        AlertDialog dialog = builder.create();
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(false);
        dialog.show();
    }

    public static MaterialDialog.Builder buildDialog(Context mContext) {
        return new MaterialDialog.Builder(mContext);
    }
}
