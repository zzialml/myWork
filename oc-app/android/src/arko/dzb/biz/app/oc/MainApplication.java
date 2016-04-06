package arko.dzb.biz.app.oc;

import android.app.Application;
import cn.jpush.android.api.JPushInterface;

public class MainApplication extends Application {
	
	private static MainApplication instance;
	public static MainApplication getApplication(){
		return instance;
	}
	
	@Override
	public void onCreate() {
		super.onCreate();
		
		instance = this;

		 JPushInterface.setDebugMode(true); 	// 设置开启日志,发布时请关闭日志
         JPushInterface.init(this);     		// 初始化 JPush
	}
}
