package d.project;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WriteDataToWebSocket{
	private Pattern ptrn;
	
	public WriteDataToWebSocket() {
		this.ptrn = Pattern.compile("<([^>]+)>");
	}
	

	public void run() {
		if(ConnectionUtil.isReadyToSend) 
		{
			StringBuffer message = ConnectionUtil.getConnectionUtilObj().message;
			
			Matcher matcher = ptrn.matcher(message);
			
			//only first occurence.
			if(matcher.find())
			{
				String dataToWrite = matcher.group();
				try {
					
					if(ConnectionUtil.webSession != null
							&& dataToWrite != null)
						ConnectionUtil.webSession.getBasicRemote().sendText(dataToWrite);
				
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				int endIndex = matcher.end();
				
				System.out.println("end:" + endIndex + ",message:"+ message);
				if(endIndex >= (ConnectionUtil.getConnectionUtilObj().message.length()-1))
				{
					ConnectionUtil.getConnectionUtilObj().message = new StringBuffer("");
				}
				else
				{
					System.out.println("all string:" +ConnectionUtil.getConnectionUtilObj().message);
					ConnectionUtil.getConnectionUtilObj().message = new StringBuffer(ConnectionUtil.getConnectionUtilObj().message.substring(endIndex+1));
				}
			}
			
			ConnectionUtil.isReadyToSend = false;
		}
		
	}

}
