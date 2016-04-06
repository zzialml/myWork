package arko.dzb.biz.app.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import arko.dzb.biz.app.oc.MainApplication;
import arko.dzb.biz.app.utils.Globals;
import cn.jpush.android.api.JPushInterface;

import com.arko.ason.ASON;

public class JpushPlugin extends CordovaPlugin {
	private static JpushPlugin instance;

	/**
	 * 注意 构造方法不能为
	 * 
	 * Plugin_intent(){}
	 * 
	 * 可以不写或者 定义为如下
	 * 
	 */
	public JpushPlugin() {
		System.out.println(this + "----------");
		instance = this;
	}

	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
	}

	CallbackContext callbackContext;

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		Log.i("123", action);

		if (action.equals("intent")) {
			// 获取args的第一个参数
			System.out.println("--------------------------------");
			System.out.println("jpush绑定账号----------" + args.getString(0));

			JPushInterface.setAlias(MainApplication.getApplication(),
					args.getString(0), null);
			return true;
		}
		return false;

	}

	public static void NotificationOpen(String msg) {
		try {
//			ASON ason = new ASON(msg);
//			int msgSendId = Integer.parseInt(ason.get("msgSendId").toString());
			System.out.println(msg+">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			String js = String.format("javascript:jpushOpenNotification('%s');", msg);
			Globals.cordovaWebView.sendJavascript(js);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}