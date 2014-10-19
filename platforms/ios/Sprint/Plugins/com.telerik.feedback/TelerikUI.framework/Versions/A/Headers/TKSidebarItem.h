//
//  TKSidebarItem.h
//
//  Copyright (c) 2013 Telerik Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TKSidebarItem : UIView

- (id)initWithTitle:(NSString*)title action:(SEL)action;
- (id)initWithTitle:(NSString *)title action:(SEL)action image:(UIImage*)image;
- (id)initWithTitle:(NSString *)title action:(SEL)action image:(UIImage *)image header:(NSString*)header;
- (id)initWithReuseIdentifier:(NSString *)reuseIdentifier;

@property (nonatomic, copy) NSString* title;
@property (nonatomic, copy) NSString* header;
@property (nonatomic, strong) UIImage* image;
@property (nonatomic) SEL action;

@property (nonatomic, readonly, retain) UIImageView *imageView NS_AVAILABLE_IOS(3_0);   // default is nil.  image view will be created if necessary.
@property(nonatomic, readonly, retain) UILabel* textLabel;

@property (nonatomic, readonly, retain) UIView *contentView;
@property (nonatomic, retain) UIView *backgroundView; //The 'backgroundView' will be added as a subview behind all other views.

@property (nonatomic, readonly, copy) NSString *reuseIdentifier;

- (void)prepareForReuse;  // if the view is reusable (has a reuse identifier), this is called just before the view is returned from the table view method dequeueReusableHeaderFooterViewWithIdentifier:.  If you override, you MUST call super.

@end
