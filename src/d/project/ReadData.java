package d.project;

import jssc.*;

/* this class is for handling connection,
 * connection is requested from ui for webSocket
 * 
 * */
public class ReadData {
	public static Boolean isOpen;
	private SerialPort serialPort;
	
	public static String[] getPortNames() {
		return SerialPortList.getPortNames();
	}
	/*
	 * responsible for creating connection to a given serial port number
	 * return status.
	 * */
	public Boolean createConnection(String portName) throws Exception
	{
		Boolean status;
		serialPort = new SerialPort(portName);
		status = serialPort.openPort();
		
		serialPort.setParams(SerialPort.BAUDRATE_38400, SerialPort.DATABITS_8, SerialPort.STOPBITS_1, SerialPort.PARITY_NONE);
		serialPort.setEventsMask(SerialPort.MASK_RXCHAR);
		serialPort.addEventListener(new SerialEventListner(serialPort, this));
		
		ConnectionUtil.serialport = serialPort;
		
		return status;
	}
	
	public static void closeConnection() throws Exception 
	{
		if(ConnectionUtil.serialport != null)
			ConnectionUtil.serialport.closePort();
	}
	
	public void writeData(byte[] data) throws Exception 
	{
		//do something.
		if(ConnectionUtil.isWebSocketOpen)
		{
			if(ConnectionUtil.webSession != null)
			{
				String str = new String(data);
				ConnectionUtil.webSession.getBasicRemote().sendText(str);
			}		
		}
	}
} 
