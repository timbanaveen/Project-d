package d.project;

import javax.websocket.Session;

import jssc.SerialPort;

public class ConnectionUtil {
	public static Boolean isWebSocketOpen = false;
	public static Session webSession = null;
	public static Boolean isReadyToSend;//semaphore for thread processing(web socket).
	public static SerialPort serialport;
	private static ConnectionUtil obj;
	
	public StringBuffer message;
	
	private ConnectionUtil() {
		message = new StringBuffer();
	}
	
	public static ConnectionUtil getConnectionUtilObj() {
		if(obj == null)
		{
			obj = new ConnectionUtil();
		}
		
		return obj;
	}
	
	public void buildMessage(byte[] bytes)
	{
		String shortMessage = new String(bytes);
		message.append(shortMessage);
	}
}
