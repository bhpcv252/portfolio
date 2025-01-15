// Define types for AST structure
type ASTNode = {
    type: 'root' | 'element' | 'text';
    tag?: string; // Only for 'element' nodes
    props?: Record<string, any>; // Element properties (e.g., id, class)
    children?: ASTNode[]; // Nested children (for 'element' nodes)
    value?: string; // Text value (for 'text' nodes)
    toc?: Record<string, any>; // Table of contents (if any)
  };
  
  // Function to extract text from AST
  export const extractTextFromAST = (ast: ASTNode | null): string => {
    if (!ast || !ast.children) return ''; // Return empty string if no children or AST is null
    
    // Recursively gather all text nodes
    let textContent = '';
    ast.children.forEach(child => {
      if (child.type === 'text' && child.value) {
        textContent += child.value + ' '; // Append text value if it exists
      } else if (child.children) {
        // Recurse into child elements if they have children
        textContent += extractTextFromAST(child) + ' ';
      }
    });
  
    return textContent.trim(); // Remove extra spaces at the ends
  };
  