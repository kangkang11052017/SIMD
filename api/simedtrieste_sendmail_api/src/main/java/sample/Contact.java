package sample;

public class Contact {
	private String email;
	private String content;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	@Override
	public String toString() {
		return "Contact [email=" + email + ", content=" + content + "]";
	}
	
}
