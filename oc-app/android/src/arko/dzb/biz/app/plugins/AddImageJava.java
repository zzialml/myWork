package arko.dzb.biz.app.plugins;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.util.Log;
import arko.dzb.biz.app.oc.MainActivity;
import arko.dzb.biz.app.utils.Globals;


public class AddImageJava extends CordovaPlugin {
	private static AddImageJava instance;

	/**
	 * 注意 构造方法不能为
	 * 
	 * Plugin_intent(){}
	 * 
	 * 可以不写或者 定义为如下
	 * 
	 */
	public AddImageJava() {
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
//			System.out.println("================================");
//			System.out.println("jpush绑定账号----------" + args.getString(0));

			Intent intent = new Intent(
					Intent.ACTION_PICK,
					android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
			((MainActivity)Globals.mainContext).startActivityForResult(intent, 1002);
			return true;
		}
		
		
		return false;

	}

	

}