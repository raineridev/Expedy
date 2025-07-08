# Changelog

All notable changes to the Expedy project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-07-08

### Changed
- **BREAKING**: Renamed `sheetToLowerCase()` to `sheetToUpperCase()` in `utils/ExcelUtils.ts`
- Comprehensive variable naming refactoring across the entire codebase
- Improved variable names in all controllers for better context specificity
- Enhanced service layer variable names for improved readability
- Standardized repository method parameter names
- Updated middleware authentication variable names for clarity
- Applied consistent camelCase naming throughout all modules

### Improved
- Code readability significantly enhanced with descriptive variable names
- Maintainability improved through self-documenting variable names
- Developer experience enhanced with clearer code structure
- Professional coding standards applied following TypeScript/JavaScript best practices

### Files Modified
- `src/controllers/authController.ts` - Enhanced variable naming in authentication logic
- `src/controllers/orderController.ts` - Improved order handling variable names
- `src/controllers/storeController.ts` - Better store management variable clarity
- `src/controllers/userController.ts` - Enhanced user controller variable names
- `src/services/authService.ts` - Authentication service variable improvements
- `src/services/orderService.ts` - Order service layer variable enhancements
- `src/services/storeService.ts` - Store service variable clarity improvements
- `src/services/userService.ts` - User service variable name standardization
- `src/services/reportService.ts` - Report generation variable improvements
- `src/repositories/orderRepository.ts` - Order data access variable enhancements
- `src/repositories/storeRepository.ts` - Store repository variable improvements
- `src/repositories/userRepository.ts` - User repository variable standardization
- `src/middlewares/auth.ts` - Authentication middleware variable clarity
- `src/entities/order.ts` - Order entity pre-save hook improvements
- `src/entities/store.ts` - Store entity variable enhancements
- `src/entities/user.ts` - User entity variable improvements
- `utils/DateFormat.ts` - Date utility function variable improvements
- `utils/ExcelUtils.ts` - Excel utility function naming and logic corrections

### Technical Details
- Applied domain-specific naming conventions
- Replaced generic variable names with context-aware alternatives
- Improved loop variable names from single letters to descriptive names
- Enhanced parameter naming in function signatures
- Standardized variable naming patterns across similar functions

## [1.0.0] - 2025-07-07

### Added
- Initial project setup with Express.js and TypeScript
- User management system with authentication
- Store management with CRUD operations
- Order processing and tracking system
- JWT-based authentication middleware
- MongoDB integration with Mongoose ODM
- Zod validation schemas
- Excel report generation capabilities
- RESTful API endpoints
- Environment configuration management
- Git repository initialization and structure
