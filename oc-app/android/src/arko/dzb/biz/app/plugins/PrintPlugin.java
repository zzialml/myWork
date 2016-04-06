package arko.dzb.biz.app.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONException;

import android.widget.Toast;
import arko.dzb.biz.app.utils.ToolsUtil;

import cn.weipass.pos.sdk.IPrint;
import cn.weipass.pos.sdk.IPrint.OnEventListener;
import cn.weipass.pos.sdk.LatticePrinter;
import cn.weipass.pos.sdk.LatticePrinter.FontFamily;
import cn.weipass.pos.sdk.LatticePrinter.FontSize;
import cn.weipass.pos.sdk.LatticePrinter.FontStyle;
import cn.weipass.pos.sdk.impl.WeiposImpl;

/**
 * 前端js 连接java 执行打印插件
 * @description 
 * @version 1.0
 * @author 李梦龙 
 * @date 2016-3-14 下午2:52:24
 */
public class PrintPlugin extends CordovaPlugin{

	private static PrintPlugin instance;
	
	private static String EVENT_CONNECT_FAILD = "连接打印机失败";
	
	private static LatticePrinter p;
	
	public PrintPlugin(){
		instance = this;
	}
	
	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		// TODO Auto-generated method stub
		super.initialize(cordova, webView);
	}
	
	CallbackContext callbackContext;
	
	@Override
	public boolean execute(String action, CordovaArgs args,
			CallbackContext callbackContext) throws JSONException {
		
		this.callbackContext = callbackContext;
		
		System.out.println("进入打印插件");
		
		if("print".equals(action)){
			//执行打印操作
			makeOrderBase64(callbackContext);
			System.out.println("打印成功");
			
			return true;
		}
		
		return false;
	}
	
	/**
	 * 构造一个简单的小票打印数据, 带表格,带字体控制,带QR码.
	 * 
	 * @return
	 */
	private void makeOrderBase64(final CallbackContext callbackContext) {
		p = WeiposImpl.as().openLatticePrinter();
		
		if (p == null) {
			 callbackContext.error("尚未初始化点阵打印sdk，请稍后再试");
			return ;
		}
		
		
		p.setOnEventListener(new OnEventListener() {
			
			@Override
			public void onEvent(int what, String info) {
				//获取打印错误信息
				String message = ToolsUtil.getPrintErrorInfo(what, info);
				
				if(message == null || message.length() < 0){
					return ;
				}
				//如果打印状态不ok  --> 将错误信息返回给前端
				if(IPrint.EVENT_OK != what){
					callbackContext.error(message);
					return ;
				}
				
			}
		});
		
		//执行打印操作
		ToolsUtil.printLattice(p);
		
	}

}







