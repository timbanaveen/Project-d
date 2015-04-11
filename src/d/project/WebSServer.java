package d.project;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import jssc.SerialPortException;

@ServerEndpoint("/websocket")
public class WebSServer {
	
	@OnOpen
	public void onOpen(Session session)
	{
		ConnectionUtil.isWebSocketOpen = true;
		ConnectionUtil.webSession = session;
	}
	
	@OnClose
	public void onClose()
	{
		ConnectionUtil.isWebSocketOpen = false;
	}
	
	@OnMessage
	public void onMessage(String msg, Session session) throws IOException, SerialPortException
	{
		Boolean sent =  ConnectionUtil.serialport.writeString(msg);
		
		if(sent)
			System.out.println("received: " + msg + " successfully sent");
	}
	
}
