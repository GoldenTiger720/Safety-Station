module.exports = {
  pdf_options: {
    format: 'A4',
    margin: {
      top: '25mm',
      right: '20mm',
      bottom: '25mm',
      left: '20mm'
    },
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 10px; width: 100%; text-align: center; color: #666; padding: 5px 0; border-bottom: 1px solid #ddd;">
        <span>Warehouse Frontend - Project Documentation</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 9px; width: 100%; text-align: center; color: #666; padding: 5px 0; border-top: 1px solid #ddd;">
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        <span style="margin-left: 20px;">© 2025 RSRG - Confidential</span>
      </div>
    `
  },
  stylesheet_encoding: 'utf-8',
  stylesheet: './pdf-styles.css',
  body_class: 'markdown-body',
  marked_options: {
    headerIds: true,
    smartypants: true
  },
  launch_options: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};
