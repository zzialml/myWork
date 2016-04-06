package arko.dzb.biz.app.oc;

import org.apache.cordova.Config;
import org.apache.cordova.CordovaActivity;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebSettings;
import android.widget.Toast;
import arko.dzb.biz.app.utils.Globals;
import cn.jpush.android.api.JPushInterface;
import cn.weipass.pos.sdk.BizServiceInvoker;
import cn.weipass.pos.sdk.Weipos.OnInitListener;
import cn.weipass.pos.sdk.impl.WeiposImpl;

public class MainActivity extends CordovaActivity {
	private BizServiceInvoker mBizServiceInvoker;

	private boolean isWangPos = false;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		super.init();

		super.loadUrl(Config.getStartUrl());
		Globals.cordovaWebView = this.appView;
		Globals.mainContext = this;
		Globals.cordovaWebView.getSettings().setCacheMode(
				WebSettings.LOAD_CACHE_ELSE_NETWORK);

		WeiposImpl.as().init(MainActivity.this, new OnInitListener() {

			@Override
			public void onInitOk() {

				try {
					String deviceInfo = WeiposImpl.as().getDeviceInfo();
					System.out.println("deviceInfo ------------------ "
							+ deviceInfo);
					if (deviceInfo != null) {
						isWangPos = true;
					} else {
						isWangPos = false;
					}

					// 初始化服务调用
					mBizServiceInvoker = WeiposImpl.as()
							.openBizServiceInvoker();
				} catch (Exception e) {
					// TODO: handle exception
				}

			}

			@Override
			public void onError(String arg0) {
				// TODO Auto-generated method stub

			}
		});
		Globals.mBizServiceInvoker = mBizServiceInvoker;

		Toast.makeText(MainActivity.this, "设备名称：" + isWangPos,
				Toast.LENGTH_LONG).show();
		new Thread() {
			public void run() {
				try {
					sleep(5000);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				String js = String.format("javascript:getDeviceInfo('%s');",
						isWangPos + "");
				Globals.cordovaWebView.sendJavascript(js);

			}
		}.start();

	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		// TODO Auto-generated method stub
		super.onActivityResult(requestCode, resultCode, data);

		switch (requestCode) {
		case 1002:
			switch (resultCode) {
			case Activity.RESULT_OK: {
				Uri uri = data.getData();
				Cursor cursor = MainActivity.this.getContentResolver().query(
						uri, null, null, null, null);
				cursor.moveToFirst();
				String imgNoString = cursor.getString(0);// 图片编号
				String imgPathString = cursor.getString(1);// 图片文件路径
				String imgSizeString = cursor.getString(2);// 图片大小
				String imgNameString = cursor.getString(3);// 图片文件名
				cursor.close();

				System.out.println(imgNoString);
				System.out.println(imgPathString);
				System.out.println(imgSizeString);
				System.out.println(imgNameString);
				Toast.makeText(
						MainActivity.this,
						imgNoString + " " + imgPathString + " " + imgSizeString
								+ " " + imgNameString, Toast.LENGTH_LONG)
						.show();

				String js = String.format("javascript:getImageUrl('%s');",
						imgPathString);
				Globals.cordovaWebView.sendJavascript(js);

			}
				break;
			case Activity.RESULT_CANCELED:
				break;
			}
			break;
		}

	}

	@Override
	protected void onPause() {
		// TODO Auto-generated method stub
		super.onPause();

		JPushInterface.onPause(MainActivity.this);
	}

	@Override
	protected void onResume() {
		// TODO Auto-generated method stub

		super.onResume();
		JPushInterface.onResume(MainActivity.this);
	}

	private long back_click = System.currentTimeMillis();

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		System.out.println(back_click + "-------------------");
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			if (System.currentTimeMillis() - back_click > 3000) {
				back_click = System.currentTimeMillis();
				Toast.makeText(MainActivity.this, "再点一次  退出 !",
						Toast.LENGTH_SHORT).show();
			} else {
				android.os.Process.killProcess(android.os.Process.myPid());
				System.exit(0);
			}
		}

		return false;
	}
}
