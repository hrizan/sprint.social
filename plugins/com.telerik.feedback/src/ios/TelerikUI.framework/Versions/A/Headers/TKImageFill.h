//
//  TKImageFill.h
//  TelerikUI
//
//  Copyright (c) 2013 Telerik. All rights reserved.
//

#import "TKFill.h"

typedef enum TKImageFillResizingMode {
    /**
     The image is tiled (default).
     */
    TKImageFillResizingModeTile,
    
    /**
     The image is stretched.
     */
    TKImageFillResizingModeStretch,

    /**
     The image is shown as is.
     */
    TKImageFillResizingModeNone,
    
} TKImageFillResizingMode;

/**
 @discussion Represents an image brush.
 */
@interface TKImageFill : TKFill

/**
 Initializes with an image.
 @param image The image to draw.
 */
+ (instancetype)imageFillWithImage:(UIImage *)image;

/**
 Initializes with an image.
 @param image The image to draw.
 @param cornerRadius The corner radius in points.
 */
+ (instancetype)imageFillWithImage:(UIImage *)image cornerRadius:(CGFloat)cornerRadius;


/**
 Initializes with an image.
 @param image The image to draw.
 */
- (id)initWithImage:(UIImage *)image;


/**
 Initializes with an image.
 @param image The image to draw.
 @param cornerRadius The corner radius in points.
 */
- (id)initWithImage:(UIImage *)image cornerRadius:(CGFloat)cornerRadius;

/**
 An image to draw.
 */
@property (nonatomic, strong) UIImage* image;

/**
 Defines the resizing mode of the image.
 
 @discussion The resizing modes are defined as follows:
 
    typedef enum {
        TKImageFillResizingModeTile,        // The image is tiled (default).
        TKImageFillResizingModeStretch,     // The image is stretched.
        TKImageFillResizingModeNone,        // The image is shown as is.
    } TKImageFillResizingMode;

 */
@property (nonatomic, assign) TKImageFillResizingMode resizingMode;

@end
