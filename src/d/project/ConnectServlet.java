package d.project;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ConnectServlet
 * connects to data resource.
 */
@WebServlet("/Connect")
public class ConnectServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//port name will come from request.
		//for large data use json lib.
		BufferedReader reader = request.getReader();
		String data = reader.readLine();
		data = data.substring(1, data.length()-1);
		
		String portName = data.split(":")[1];
		portName = portName.substring(1, portName.length()-1); 
		
		String connectionStatus = getConnection(portName);
		
		response.setContentType("text/plain");
		response.getWriter().println(connectionStatus);
	}
	
	private String getConnection(String portName) {
		ReadData rd = new ReadData();
		Boolean status = false;
		try {
			status = rd.createConnection(portName);
		}
		catch(Exception e) {
			return e.getMessage();
		}
		return status.toString();
	}

}
