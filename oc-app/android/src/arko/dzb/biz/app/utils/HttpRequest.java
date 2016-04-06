package arko.dzb.biz.app.utils;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.FormBodyPart;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

public class HttpRequest {
	/**
	 * 向指定URL发送GET方法的请求
	 * 
	 * @param url
	 *            发送请求的URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return URL 所代表远程资源的响应结果
	 */
	public static String sendGet(String url, String param) {
		String result = "";
		BufferedReader in = null;
		try {
			String urlNameString = url + "?" + param;
			URL realUrl = new URL(urlNameString);
			// 打开和URL之间的连接
			URLConnection connection = realUrl.openConnection();
			// 设置通用的请求属性
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent",
					"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
			// 建立实际的连接
			connection.connect();
			// 获取所有响应头字段
			Map<String, List<String>> map = connection.getHeaderFields();
			// 遍历所有的响应头字段
			for (String key : map.keySet()) {
				System.out.println(key + "--->" + map.get(key));
			}
			// 定义 BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(
					connection.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			System.out.println("发送GET请求出现异常！" + e);
			e.printStackTrace();
		}
		// 使用finally块来关闭输入流
		finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 向指定 URL 发送POST方法的请求
	 * 
	 * @param url
	 *            发送请求的 URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return 所代表远程资源的响应结果
	 */
	public static String sendPost(String url, String param, String token,
			String[] images) {
		PrintWriter out = null;
		// OutputStream out = null;
		BufferedReader in = null;
		String result = "";
		try {
			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent",
					"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
			conn.setRequestProperty("X-Security-Token", token);
			conn.setConnectTimeout(12000);
			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);

			DataOutputStream ds = new DataOutputStream(conn.getOutputStream());
			ds.writeBytes(param + "\r\n");
			ds.writeBytes("\r\n");

			FileInputStream fStream = new FileInputStream(new File(images[0]));
			/* 设置每次写入1024bytes */
			int bufferSize = 1024;
			byte[] buffer = new byte[bufferSize];
			int length = -1;
			/* 从文件读取数据至缓冲区 */
			while ((length = fStream.read(buffer)) != -1) {
				/* 将资料写入DataOutputStream中 */
				ds.write(buffer, 0, length);
			}
			ds.writeBytes("\r\n");

			fStream.close();
			ds.flush();
			// 获取URLConnection对象对应的输出流
			// out = new PrintWriter(conn.getOutputStream());
			// out.write(param.toString().getBytes());
			// File[] files = new File[images.length];
			// for (int i = 0; i < images.length; i++) {
			// files[i] = new File(images[i]);
			//
			// InputStream is = new FileInputStream(files[i]);
			// // byte[] bytes = new byte[1024];
			// // int len = 0;
			// // while ((len = is.read(bytes)) != -1) {
			// // System.out.println(new String(bytes,"UTF-8"));
			// // out.write(bytes, 0, len);
			// // }
			// byte[] bytes = new byte[(int) files[i].length()];
			// int len = is.read(bytes);
			//
			//
			// out.write(bytes, 0, len);
			//
			// is.close();
			// if (i != images.length)
			// out.write(",".getBytes());
			//
			// }
			// // 发送请求参数
			// out.print(param);
			// flush输出流的缓冲
			// out.flush();
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(
					new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			System.out.println("发送 POST 请求出现异常！" + e);
			e.printStackTrace();
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {

					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}

	public static String sendPost02(String url, String param, String token,
			String[] images) {
		HttpPost httpRequest = new HttpPost(url);
		httpRequest.setHeader("X-Security-Token", token);
		// Post运作传送变数必须用NameValuePair[]阵列储存
		// 传参数 服务端获取的方法为request.getParameter("name")
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("content", "sadfsafasfds"));
		try {

			// 发出HTTP request
			httpRequest.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));

//			MultipartEntity mpEntity = new MultipartEntity();
//			ContentBody cbFile = new FileBody(new File(images[0]));
//			mpEntity.addPart(images[0], cbFile);
//
//			httpRequest.setEntity(mpEntity);

			// 取得HTTP response
			HttpResponse httpResponse = new DefaultHttpClient()
					.execute(httpRequest);

			// 若状态码为200 ok
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				// 取出回应字串
				String strResult = EntityUtils.toString(httpResponse
						.getEntity());
				return strResult;
			} else {
				return httpResponse.getStatusLine().toString();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
			return e.getMessage().toString();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return e.getMessage().toString();
		} catch (IOException e) {
			e.printStackTrace();
			return e.getMessage().toString();
		}

	}

}