package arko.dzb.biz.app.plugins;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;
import arko.dzb.biz.app.utils.CashierSign;
import arko.dzb.biz.app.utils.Globals;
import cn.jpush.android.data.g;
import cn.weipass.pos.sdk.BizServiceInvoker;
import cn.weipass.pos.sdk.BizServiceInvoker.OnResponseListener;
import cn.weipass.pos.sdk.Weipos.OnInitListener;
import cn.weipass.pos.sdk.impl.WeiposImpl;
import cn.weipass.service.bizInvoke.RequestInvoke;
import cn.weipass.service.bizInvoke.RequestResult;

import com.arko.ason.ASON;

public class PayPluginJava extends CordovaPlugin {
	private static PayPluginJava instance;

	private Context context;
	private BizServiceInvoker mBizServiceInvoker;

	/**
	 * 注意 构造方法不能为
	 * 
	 * Plugin_intent(){}
	 * 
	 * 可以不写或者 定义为如下
	 * 
	 */
	public PayPluginJava() {
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

		if (action.equals("intent")) {
			System.out.println("--------------------------------");
			System.out.println("支付----------" + args.getString(0));
			String str = args.getString(0);
			try {
				JSONObject ason = new JSONObject(str);
				System.out.println(ason.get("id"));
				System.out.println(ason.get("attach"));
				System.out.println(ason.get("body"));
				System.out.println(ason.get("channel"));
				System.out.println(ason.get("notify_url"));
				System.out.println(ason.get("out_trade_no"));
				System.out.println(ason.get("total_fee"));

				Globals.PayId = ason.get("id").toString();

				zhifu(ason.get("out_trade_no").toString(), ason.get("total_fee").toString(),
						ason.get("channel").toString(), ason.get("body").toString(),
						ason.get("attach").toString(), ason.get("notify_url").toString());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return true;
		}
		return false;

	}

	private void zhifu(String out_trade_no, String total_fee, String channel,
			String body, String attach, String notify_url) {
		context = Globals.mainContext;
		mBizServiceInvoker = Globals.mBizServiceInvoker;
		if (mBizServiceInvoker == null) {
			WeiposImpl.as().init(context, new OnInitListener() {

				@Override
				public void onInitOk() {

					try {
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
		}

		mBizServiceInvoker.setOnResponseListener(mOnResponseListener);
		try {
			RequestInvoke cashierReq = new RequestInvoke();
			cashierReq.pkgName = context.getPackageName();
			cashierReq.sdCode = "CASH002";// 收银服务的sdcode信息
			cashierReq.bpId = CashierSign.InvokeCashier_BPID;
			cashierReq.launchType = 0;// 0:启动main
										// Activity，1：启动指定Activity，2：启动service
			cashierReq.params = CashierSign.sign(out_trade_no, body, attach,
					(int)(Double.parseDouble(total_fee)*100)+"", notify_url);
			cashierReq.seqNo = "1";
			RequestResult request = mBizServiceInvoker.request(cashierReq);
			Toast.makeText(context,
					request.token + "," + request.seqNo + "," + request.result,
					Toast.LENGTH_SHORT).show();
			Log.i("requestCashier", request.token + "," + request.seqNo + ","
					+ request.result);

			// 发送调用请求
			RequestResult r = mBizServiceInvoker.request(cashierReq);
			if (r != null) {
				Log.d("requestCashier", "request result:" + r.result
						+ "|launchType:" + cashierReq.launchType);
				String err = null;
				switch (r.result) {
				case BizServiceInvoker.REQ_SUCCESS: {
					// 调用成功
					Toast.makeText(context, "收银服务调用成功", Toast.LENGTH_SHORT)
							.show();
					break;
				}
				case BizServiceInvoker.REQ_ERR_INVAILD_PARAM: {
					Toast.makeText(context, "请求参数错误！", Toast.LENGTH_SHORT)
							.show();
					break;
				}
				case BizServiceInvoker.REQ_ERR_NO_BP: {
					Toast.makeText(context, "未知的合作伙伴！", Toast.LENGTH_SHORT)
							.show();
					break;
				}
				case BizServiceInvoker.REQ_ERR_NO_SERVICE: {
					Toast.makeText(context, "未找到合适的服务！", Toast.LENGTH_SHORT)
							.show();
					break;
				}
				case BizServiceInvoker.REQ_NONE: {
					Toast.makeText(context, "请求未知错误！", Toast.LENGTH_SHORT)
							.show();
					break;
				}
				}
				if (err != null) {
					Log.w("requestCashier", "serviceInvoker request err:" + err);
				}
			}

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 这个是服务调用完成后的响应监听方法
	 */
	private OnResponseListener mOnResponseListener = new OnResponseListener() {

		@Override
		public void onResponse(String sdCode, String token, byte[] data) {
			// 收银服务调用完成后的返回方法
			Log.e("requestCashier onResponse", "sdCode = " + sdCode
					+ " , token = " + token + " , data = " + new String(data));

			String str = new String(data);
			String errCode = str.substring(12, 13);

			// System.out.println(errCode+Globals.PayId+"=================");

			String js = String.format("javascript:payPluginJsResult('%s');",
					errCode + Globals.PayId);
			Globals.cordovaWebView.sendJavascript(js);

			Toast.makeText(Globals.mainContext, "接收到服务调用完成回调",
					Toast.LENGTH_SHORT).show();
		}

		@Override
		public void onFinishSubscribeService(boolean result, String err) {
			// TODO Auto-generated method stub
			// bp订阅收银服务返回结果
			if (!result) {
				Toast.makeText(Globals.mainContext, err, Toast.LENGTH_SHORT)
						.show();
			}
		}
	};

}
