/**
 * QR Code Generator Class
 * Supports multiple generation methods: API and local library
 * @author AI Assistant
 */

// Import QRious for Node.js environments
let QRious = null;
if (typeof window !== 'undefined') {
  // For client-side
  try {
    QRious = require('qrious');
  } catch (e) {
    // Fallback if require doesn't work
    console.warn('QRious not found, will use API method only');
  }
}

class QRCodeGenerator {
  constructor(options = {}) {
    this.options = {
      size: 256,
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
      style: 'square',
      errorCorrectionLevel: 'M', // L, M, Q, H
      ...options
    };
    
    // API endpoints for QR generation
    this.apiEndpoints = {
      qrServer: 'https://api.qrserver.com/v1/create-qr-code/',
      quickChart: 'https://quickchart.io/qr'
    };
  }

  /**
   * Format data based on QR type
   * @param {string} type - The type of QR code
   * @param {string} data - The raw data
   * @returns {string} Formatted data
   */
  formatData(type, data) {
    switch (type) {
      case 'url':
        return data.startsWith('http') ? data : `https://${data}`;
      
      case 'email':
        return `mailto:${data}`;
      
      case 'phone':
        return `tel:${data}`;
      
      case 'sms':
        return `sms:${data}`;
      
      case 'wifi':
        // Format: SSID:Password:Security
        const [ssid, password, security = 'WPA'] = data.split(':');
        return `WIFI:T:${security};S:${ssid};P:${password};;`;
      
      case 'text':
      default:
        return data;
    }
  }

  /**
   * Generate QR code using API method
   * @param {string} data - Data to encode
   * @param {string} method - API method to use ('qrServer' or 'quickChart')
   * @returns {Promise<string>} URL of generated QR code
   */
  async generateWithAPI(data, method = 'qrServer') {
    const encodedData = encodeURIComponent(data);
    
    try {
      switch (method) {
        case 'qrServer':
          return `${this.apiEndpoints.qrServer}?size=${this.options.size}x${this.options.size}&data=${encodedData}&color=${this.options.foregroundColor.replace('#', '')}&bgcolor=${this.options.backgroundColor.replace('#', '')}`;
        
        case 'quickChart':
          return `${this.apiEndpoints.quickChart}?text=${encodedData}&size=${this.options.size}&dark=${this.options.foregroundColor.replace('#', '')}&light=${this.options.backgroundColor.replace('#', '')}`;
        
        default:
          throw new Error('Unsupported API method');
      }
    } catch (error) {
      console.error('API generation failed:', error);
      throw error;
    }
  }

  /**
   * Generate QR code using local library (QRious)
   * @param {string} data - Data to encode
   * @returns {string} Data URL of generated QR code
   */
  generateWithLibrary(data) {
    try {
      if (!QRious) {
        throw new Error('QRious library not available');
      }

      const canvas = document.createElement('canvas');
      const qr = new QRious({
        element: canvas,
        value: data,
        size: this.options.size,
        foreground: this.options.foregroundColor,
        background: this.options.backgroundColor,
        level: this.options.errorCorrectionLevel
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Library generation failed:', error);
      throw error;
    }
  }

  /**
   * Generate QR code with fallback methods
   * @param {string} type - QR code type
   * @param {string} rawData - Raw data to encode
   * @param {string} preferredMethod - Preferred generation method
   * @returns {Promise<Object>} Generated QR code info
   */
  async generate(type, rawData, preferredMethod = 'api') {
    const formattedData = this.formatData(type, rawData);
    
    let qrUrl;
    let method;
    
    try {
      if (preferredMethod === 'api') {
        qrUrl = await this.generateWithAPI(formattedData, 'qrServer');
        method = 'api';
      } else {
        qrUrl = this.generateWithLibrary(formattedData);
        method = 'library';
      }
    } catch (error) {
      // Fallback to alternative method
      try {
        if (preferredMethod === 'api') {
          qrUrl = this.generateWithLibrary(formattedData);
          method = 'library';
        } else {
          qrUrl = await this.generateWithAPI(formattedData, 'quickChart');
          method = 'api';
        }
      } catch (fallbackError) {
        throw new Error('All QR generation methods failed');
      }
    }

    return {
      url: qrUrl,
      data: formattedData,
      type,
      method,
      options: { ...this.options }
    };
  }

  /**
   * Update generator options
   * @param {Object} newOptions - New options to merge
   */
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
  }

  /**
   * Download QR code as image
   * @param {string} qrUrl - URL or data URL of QR code
   * @param {string} filename - Filename for download
   */
  async downloadQR(qrUrl, filename = 'qrcode.png') {
    try {
      let blob;
      
      if (qrUrl.startsWith('data:')) {
        // Data URL - convert to blob
        const response = await fetch(qrUrl);
        blob = await response.blob();
      } else {
        // External URL - fetch the image
        const response = await fetch(qrUrl);
        blob = await response.blob();
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  /**
   * Copy QR code to clipboard
   * @param {string} qrUrl - URL or data URL of QR code
   */
  async copyToClipboard(qrUrl) {
    try {
      if (qrUrl.startsWith('data:')) {
        // Data URL - convert to blob and copy
        const response = await fetch(qrUrl);
        const blob = await response.blob();
        
        if (navigator.clipboard && navigator.clipboard.write) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
        } else {
          throw new Error('Clipboard API not supported');
        }
      } else {
        // External URL - copy URL as text
        await navigator.clipboard.writeText(qrUrl);
      }
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
      throw error;
    }
  }

  /**
   * Validate QR data based on type
   * @param {string} type - QR code type
   * @param {string} data - Data to validate
   * @returns {Object} Validation result
   */
  validateData(type, data) {
    const result = { valid: true, errors: [] };

    if (!data || data.trim() === '') {
      result.valid = false;
      result.errors.push('Data cannot be empty');
      return result;
    }

    switch (type) {
      case 'url':
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
        if (!urlPattern.test(data)) {
          result.valid = false;
          result.errors.push('Invalid URL format');
        }
        break;
      
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data)) {
          result.valid = false;
          result.errors.push('Invalid email format');
        }
        break;
      
      case 'phone':
        const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phonePattern.test(data.replace(/[\s\-\(\)]/g, ''))) {
          result.valid = false;
          result.errors.push('Invalid phone number format');
        }
        break;
      
      case 'wifi':
        const wifiParts = data.split(':');
        if (wifiParts.length < 2) {
          result.valid = false;
          result.errors.push('WiFi format should be SSID:Password:Security');
        }
        break;
    }

    return result;
  }

  /**
   * Get supported QR types
   * @returns {Array} Array of supported types with descriptions
   */
  static getSupportedTypes() {
    return [
      { value: 'url', label: 'Nettside (URL)', description: 'Web address or link' },
      { value: 'text', label: 'Tekst', description: 'Plain text content' },
      { value: 'email', label: 'E-post', description: 'Email address' },
      { value: 'phone', label: 'Telefon', description: 'Phone number' },
      { value: 'sms', label: 'SMS', description: 'SMS message' },
      { value: 'wifi', label: 'Wi-Fi', description: 'WiFi network credentials' }
    ];
  }

  /**
   * Get supported styles
   * @returns {Array} Array of supported styles
   */
  static getSupportedStyles() {
    return [
      { value: 'square', label: 'Firkantede', description: 'Square modules' },
      { value: 'rounded', label: 'Avrundede', description: 'Rounded modules' },
      { value: 'dot', label: 'Prikker', description: 'Dot-style modules' }
    ];
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QRCodeGenerator;
}

// Also make available globally
if (typeof window !== 'undefined') {
  window.QRCodeGenerator = QRCodeGenerator;
} 