//
//  TKSidebarController.h
//  TelerikUI
//
//  Copyright (c) 2014 Telerik. All rights reserved.
//

#import <UIKit/UIKit.h>

@class TKSidebar;

@interface TKSidebarController : UIViewController

- (id)initWithContent:(UIViewController *)contentController;

@property (nonatomic, strong) UIViewController *contentController;

@end
