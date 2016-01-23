package d.project;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import jssc.SerialPortException;

@ServerEndpoint("/websocket")
public class WebSServer {
	
	private Logger logger = LogManager.getLogger(WebSServer.class);
	
	@OnOpen
	public void onOpen(Session session)
	{
		ConnectionUtil.isWebSocketOpen = true;
		ConnectionUtil.webSession = session;
		
		logger.info("websocket open");
	}
	
	@OnClose
	public void onClose()
	{
		ConnectionUtil.isWebSocketOpen = false;
		
		logger.info("websocket closed");
	}
	
	@OnMessage
	public void onMessage(String msg, Session session) throws IOException, SerialPortException
	{
		logger.info("websocket message received: " + msg);
		
		Boolean sent =  ConnectionUtil.serialport.writeString(msg);
		
		if(sent)
			logger.info("websocket message sent to port: " + sent);
	}
	
}
