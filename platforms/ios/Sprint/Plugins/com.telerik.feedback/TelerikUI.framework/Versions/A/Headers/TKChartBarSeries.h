//
//  TKChartBarSeries.h
//  TelerikUI
//
//  Copyright (c) 2013 Telerik. All rights reserved.
//

#import "TKChartSeries.h"

/**
 Represents TKChart bar series. Check this [Guide](chart-series-bar) for more information.
 
 <img src="../docs/images/chart-series-bar002.png">
 
 @see [Working with TKChartBarSeries](chart-series-bar)
 
 */
@interface TKChartBarSeries : TKChartSeries

/**
 The value which controls the distance between bar groups as percent. Note that the value should be between 0 and 1, where a value of 0 means that a bar would take the entire space between two ticks, while a value of 1 means the bar will have zero width as all the space should appear as a gap. Default is 0.25f.
*/
@property (nonatomic, assign) CGFloat gapLength;

@end