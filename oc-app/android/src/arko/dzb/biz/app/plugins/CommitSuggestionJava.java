package arko.dzb.biz.app.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.R.string;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;
import arko.dzb.biz.app.oc.MainActivity;
import arko.dzb.biz.app.utils.Globals;
import arko.dzb.biz.app.utils.HttpRequest;

public class CommitSuggestionJava extends CordovaPlugin {
	private static CommitSuggestionJava instance;

	/**
	 * 注意 构造方法不能为
	 * 
	 * Plugin_intent(){}
	 * 
	 * 可以不写或者 定义为如下
	 * 
	 */
	public CommitSuggestionJava() {
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
			// System.out.println("jpush绑定账号----------" + args.getString(0));

			String getDataString =args.getString(0);
			String token = getDataString.split("<token>")[0];
			String data = getDataString.split("<token>")[1];
			String[] datas = data.split("<->");
			String[] imageString = new String[datas.length-1];
			for (int i = 1; i < datas.length; i++) {
				imageString[i-1] = datas[i];
			}
			
			String sr = HttpRequest.sendPost02(
					"http://ground.kxfresh.com:8188/api/suggestion/add?_t="+System.currentTimeMillis(),
					"content="+datas[0],token,imageString);
//			String sr = HttpRequest.sendPost(
//					"http://192.168.233.216:8080/api/suggestion/add?_t="+System.currentTimeMillis(),
//					"content="+datas[0],token,imageString);
			
			Toast.makeText(Globals.mainContext, sr,
					Toast.LENGTH_LONG).show();
			return true;
		}

		return false;

	}

}
