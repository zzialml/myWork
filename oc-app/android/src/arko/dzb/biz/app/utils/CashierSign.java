package arko.dzb.biz.app.utils;


import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import android.util.Log;

/**
 * Created by IntelliJ IDEA
 * User: Sirius
 * Date: 2015/6/19
 * Time: 15:20
 */
public class CashierSign {

	//业务demo，收银测试环境
    public static final String InvokeCashier_BPID="55dc1561fa0bab42b2c2b3d0";
    public static final String InvokeCashier_KEY="L8hS2nhIlietf3el83z9wfjpQUVjHghd";
    
    public static final String CHANNEL = "POS";
    public static final String PAYTYPE = "10004";
    public static final String FEETYPE = "1";
    
    public static final String PACKAGE = "arko.dzb.biz.app";
    public static final String CLASSPATH = "arko.dzb.biz.app.MainActivity";
    
    
    private static final String Tag="CashierSign";

    private static final String SignType="MD5";
    private static final String inputCharset="UTF-8";

    public static byte[] sign(String outTradeNo,String body,String attach,String totalFee,String notify_url) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        Map<String,String> dataMap=new HashMap<String, String>();
        dataMap.put("bp_id",InvokeCashier_BPID);
        dataMap.put("channel",CHANNEL);
        dataMap.put("payType",PAYTYPE);
        dataMap.put("fee_type",FEETYPE);
        dataMap.put("input_charset",inputCharset);
        dataMap.put("package",PACKAGE);
        dataMap.put("classpath",CLASSPATH);
        dataMap.put("out_trade_no",outTradeNo);
        dataMap.put("body",body);
        dataMap.put("attach",attach);
        dataMap.put("total_fee",totalFee);
        dataMap.put("notify_url", notify_url);
//        dataMap.put("notify_url","http://apps.weipass.cn/pay/notify");


        String sign=getSign(InvokeCashier_KEY,dataMap);
        dataMap.put("sign",sign);
        
        
        JSONObject json=new JSONObject(dataMap);
        return json.toString().getBytes(inputCharset);
    }
    //原始
//    public static byte[] sign(String bpId ,String invokeCashierKey,String channel,String payType,String outTradeNo,String body,String attach,String feeType,String totalFee) throws UnsupportedEncodingException, NoSuchAlgorithmException {
//        Map<String,String> dataMap=new HashMap<String, String>();
//        dataMap.put("bp_id",bpId);
//        dataMap.put("channel",channel);
//        dataMap.put("payType",payType);
//        dataMap.put("out_trade_no",outTradeNo);
//        dataMap.put("body",body);
//        dataMap.put("attach",attach);
//        dataMap.put("fee_type",feeType);
//        dataMap.put("total_fee",totalFee);
//        dataMap.put("input_charset",inputCharset);
//        dataMap.put("notify_url","http://apps.weipass.cn/pay/notify");
//        dataMap.put("package","com.example.zhifu");
//        dataMap.put("classpath","com.example.zhifu.MainActivity");
//
//        String sign=getSign(invokeCashierKey,dataMap);
//        dataMap.put("sign",sign);
//        
//        
//        JSONObject json=new JSONObject(dataMap);
//        return json.toString().getBytes(inputCharset);
//    }
   //1.23
//    public static byte[] sign(String bpId ,String invokeCashierKey,String channel,String payType,String outTradeNo,String body,String attach,String feeType,String totalFee) throws UnsupportedEncodingException, NoSuchAlgorithmException {
//        Date dateStart = new Date(System.currentTimeMillis());
//        Date dateExpire = new Date(System.currentTimeMillis());
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
//        String time_start  = sdf.format(dateStart);
//        String time_expire  = sdf.format(dateExpire);
//        
//    	
//    	Map<String,String> dataMap=new HashMap<String, String>();
//        dataMap.put("sign_type", "MD5");
//        dataMap.put("bp_id",bpId);
//        dataMap.put("channel",channel);
//        dataMap.put("out_trade_no",outTradeNo);
//        dataMap.put("body",body);
//        dataMap.put("attach",attach);
//        dataMap.put("total_fee",totalFee);
//        dataMap.put("notify_url","http://apps.weipass.cn/pay/notify");
//        dataMap.put("time_start", time_start);
//        dataMap.put("time_expire", time_expire);
//        dataMap.put("input_charset",inputCharset);
//        dataMap.put("package","com.example.zhifu");
//        dataMap.put("classpath","com.example.zhifu.MainActivity");
//
//        String sign=getSign(invokeCashierKey,dataMap);
//        dataMap.put("sign",sign);
//        
//        
//        JSONObject json=new JSONObject(dataMap);
//        return json.toString().getBytes(inputCharset);
//    }

    private static String getSign(String invokeCashierKey,Map<String,String> dataMap) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        List<String> keyList=new ArrayList<String>(dataMap.keySet());
        Collections.sort(keyList);
        StringBuilder builder=new StringBuilder();
        for (String mapKey:keyList){
            builder.append(mapKey).append("=").append(dataMap.get(mapKey)).append("&");
        }
        builder.append("key=").append(invokeCashierKey);
        Log.i(Tag,"MD5加密前-->"+builder);
        MessageDigest md5=MessageDigest.getInstance(SignType);
        md5.update(builder.toString().getBytes(inputCharset));
        byte[] md5Bytes=md5.digest();
        StringBuffer hexValue = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; i++) {
            int val = ((int) md5Bytes[i]) & 0xff;
            if (val < 16) {
                hexValue.append("0");
            }
            hexValue.append(Integer.toHexString(val));
        }
        Log.i(Tag,"MD5加密后-->"+hexValue);
        return hexValue.toString();
    }
}
