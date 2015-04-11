package d.project;

import jssc.SerialPort;
import jssc.SerialPortEvent;
import jssc.SerialPortEventListener;

public class SerialEventListner implements SerialPortEventListener{
	private SerialPort port;
	private ReadData readData;
	private WriteDataToWebSocket writeThread;
	
	public SerialEventListner(SerialPort port, ReadData readData) 
	{
		this.port = port;
		this.readData = readData;
	}
	
	@Override
	public void serialEvent(SerialPortEvent serialPortEvent) {
		if(serialPortEvent.isRXCHAR()
				&& ConnectionUtil.isWebSocketOpen)//if char.
		{
			//no of chars are 100
			if(serialPortEvent.getEventValue() > 100)
			{
				try {
					ConnectionUtil.getConnectionUtilObj().buildMessage((this.port.readBytes()));
					ConnectionUtil.isReadyToSend = true;
					if(writeThread == null)
					{
						writeThread = new WriteDataToWebSocket();
						writeThread.run();
					}
					else
						writeThread.run();
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
	}

}
