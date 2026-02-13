const API_URL =
  process.env.REACT_APP_API_URL || window.location.origin;

export const authService = {
  /**
   * Redirect to Google OAuth login
   */
  loginWithGoogle: () => {
    window.location.href = `${API_URL}/auth/google`;
  },

  /**
   * Get current logged-in user
   * @returns {Promise<Object>} User data or null
   */
  getCurrentUser: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include", // Send cookies
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting current user:", error);
      return { authenticated: false, user: null };
    }
  },

  /**
   * Logout current user
   * @returns {Promise<Object>} Response data
   */
  logout: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  /**
   * Check authentication status (for debugging)
   * @returns {Promise<Object>} Auth status
   */
  checkStatus: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/status`, {
        credentials: "include",
      });
      return await response.json();
    } catch (error) {
      console.error("Error checking status:", error);
      return { authenticated: false };
    }
  },
};

export { API_URL };
