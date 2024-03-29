//
//  TKChartLineAnnotationStyle.h
//  TelerikUI
//
//  Copyright (c) 2013 Telerik. All rights reserved.
//

#import "TKChartAnnotationStyle.h"

@class TKChartPaletteItem;
@class TKShape;
@class TKFill;
@class TKStroke;

/**
 The orientation of line annotation.
 */
typedef enum TKChartCrossLineAnnotationOrientation {
    /**
     Horizontal annotation orientation.
     */
    TKChartCrossLineAnnotationOrientationHorizontal = 1 << 0,
    /**
     Vertical annotation orientation.
     */
    TKChartCrossLineAnnotationOrientationVertical   = 1 << 1,
} TKChartCrossLineAnnotationOrientation;

@interface TKChartCrossLineAnnotationStyle : TKChartAnnotationStyle

/**
 The annotioatn orientation.
 */
@property (nonatomic, assign) TKChartCrossLineAnnotationOrientation orientation;

/**
 The vertical line stroke.
 */
@property (nonatomic, strong) TKStroke *verticalLineStroke;

/**
 The horizontal line stroke.
 */
@property (nonatomic, strong) TKStroke *horizontalLineStroke;

/**
 The shaped used for drawing the data points. It is supported for line, area and scatter series.
 By default, it is a circle with a size of 6 px on scatter series and nil (no shape) for line and area.
 */
@property (nonatomic, strong) TKShape *pointShape;

/**
 The point shape insets.
 **/
@property (nonatomic, assign) UIEdgeInsets pointShapeInsets;

/**
 The shape fill.
 */
@property (nonatomic, strong) TKFill *pointShapeFill;

/**
 The shape stroke.
 */
@property (nonatomic, strong) TKStroke *pointShapeStroke;

/**
 The line inset.
 */
@property (nonatomic, assign) UIEdgeInsets insets;

@end
