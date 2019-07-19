package com.generalUtils;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.generalUtils.modules.RNCommonUtilsModule;
import com.generalUtils.modules.RNRequestPermisionModule;
import com.generalUtils.modules.Toast;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RNMyPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext context) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNCommonUtilsModule(context));
        modules.add(new Toast(context));
        modules.add(new RNRequestPermisionModule(context));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext context) {
        return Collections.emptyList();
    }
}
