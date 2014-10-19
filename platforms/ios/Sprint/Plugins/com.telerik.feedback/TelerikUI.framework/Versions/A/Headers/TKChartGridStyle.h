//
//  TKChartGridStyle.h
//  TelerikUI
//
//  Copyright (c) 2013 Telerik. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TKStyleNode.h"

/**
 @enum TKChartGridZPosition
 @discussion Represents an enum that defines the grid position according to the series.
 */
typedef enum TKChartGridZPosition {
    /**
     The grid is rendered below the series (default).
     */
    TKChartGridZPositionBelowSeries,
    /**
     The grid is rendered above the series.
     */
    TKChartGridZPositionAboveSeries
} TKChartGridZPosition;

/**
 @enum TKGridDrawOrder
 @discussion Represents the order of drawing.
 */
typedef enum TKChartGridDrawOrder {
    /**
     The grid is drawn horizontally and then vertically (default).
     */
    TKChartGridDrawModeHorizontalFirst,
    /**
     The grid is drawn horizontally and then vertically.
     */
    TKChartGridDrawModeVerticalFirst
} TKChartGridDrawOrder;

@class TKFill;
@class TKStroke;

/**
 Represents a grid style of chart.
 
 <img src="../docs/images/chart-grid-customization005.png">
 
 @see [Working with chart's grid](Chart-GridCustomization)
 */
@interface TKChartGridStyle : TKStyleNode

/**
 The grid position according to the series.
 
 @discussion The grid Z positions are defined as follows: 
 
    typedef enum {
        TKChartGridZPositionBelowSeries,  // The grid is rendered below the series (default)
        TKChartGridZPositionAboveSeries   // The grid is rendered above the series.
    } TKChartGridZPosition;
 
 */
@property (nonatomic, assign) TKChartGridZPosition zPosition;

/**
 The vertical line stroke.
 */
@property (nonatomic, strong) TKStroke *verticalLineStroke;

/**
 The vertical alternate line stroke.
 */
@property (nonatomic, strong) TKStroke *verticalLineAlternateStroke;

/**
 Determines whether the vertical line is hidden.
 */
@property (nonatomic, assign) BOOL verticalLinesHidden;

/**
 The background pattern of the fill among vertical lines.
 */
@property (nonatomic, strong) TKFill *verticalFill;

/**
 The background pattern of alternate fill among vertical lines.
 */
@property (nonatomic, strong) TKFill *verticalAlternateFill;

/**
 The horizontal line stroke.
 */
@property (nonatomic, strong) TKStroke *horizontalLineStroke;

/**
 The horizontal alternate line stroke.
 */
@property (nonatomic, strong) TKStroke *horizontalLineAlternateStroke;

/**
 Determines whether the hidden line is hidden.
 */
@property (nonatomic, assign) BOOL horizontalLinesHidden;

/**
 The background pattern of the fill among horizontal lines.
 */
@property (nonatomic, strong) TKFill *horizontalFill;

/**
 The background pattern of the alternate fill among horizontal lines.
 */
@property (nonatomic, strong) TKFill *horizontalAlternateFill;

/**
 The background fill color. By default, it is nil (no background color is drawn).
 */
@property (nonatomic, strong) TKFill *backgroundFill;

/**
 The draw order. By default, it is TKGridDrawModeHorizontalFirst
 
 @discussion The grid draw orders are defined as follows:
 
    typedef enum TKGridDrawOrder {
        TKGridDrawModeHorizontalFirst,      // The grid is drawn horizontally and then vertically (default).
        TKGridDrawModeVerticalFirst         // The grid is drawn horizontally and then vertically.
    } TKGridDrawOrder;

 */
@property (nonatomic, assign) TKChartGridDrawOrder drawOrder;

@end
