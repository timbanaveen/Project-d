package d.project;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import sun.org.mozilla.javascript.internal.json.JsonParser;

/**
 * Servlet implementation class PortNameServlet
 */
@WebServlet("/PortNames")
public class PortNameServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Logger logger = LogManager.getLogger(PortNameServlet.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PortNameServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//use json parser when large data.
		String portNames = "";
		
		for(String str:ReadData.getPortNames())
			portNames += (str + ",");
		
		logger.info("port names: "+portNames);
		response.setContentType("text/plain");
		response.getWriter().println(portNames);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {}

}
