//
//  TKSidebarHeaderItem.h
//  TelerikUI
//
//  Copyright (c) 2014 Telerik. All rights reserved.
//

#import "TKSidebarItem.h"

@class TKSidebar;

@interface TKSidebarHeaderItem : TKSidebarItem

- (id)initWithSidebar:(TKSidebar *)sidebar;

@property(nonatomic, readonly, retain) UIButton* navigationButton;

@end
