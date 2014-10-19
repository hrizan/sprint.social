//
//  TKCalendarYearViewController.h
//  Telerik UI
//
//  Copyright (c) 2014 Telerik. All rights reserved.
//

#import <UIKit/UIKit.h>

@class TKCalendar;

/**
 @discussion A view controller containing TKCalendar in year view mode. Use this controller to create iOS 7 calendar style user experience.
 */
@interface TKCalendarYearViewController : UIViewController

/**
 The calendar view contained in this view controller.
 */
- (TKCalendar*)contentView;

/**
 Returns the frame which represents the currently selected month (read-only).
 */
- (CGRect)selectedItemRect;

@end
