package d.project;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Servlet implementation class disconnectServlet
 */
@WebServlet("/disconnectport")
public class disconnectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Logger logger = LogManager.getLogger(disconnectServlet.class.getName());
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public disconnectServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			ReadData.closeConnection();
			logger.info("serial port connection closed");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.info(e.getMessage());
			e.printStackTrace();
		}
	}

}
