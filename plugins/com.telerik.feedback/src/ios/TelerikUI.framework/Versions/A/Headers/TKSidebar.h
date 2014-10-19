//
//  TKSidebar.h
//
//  Copyright (c) 2013 Telerk Inc. All rights reserved.
//
#import <UIKit/UIKit.h>

#define DEFAULT_SIZE   280

UIKIT_EXTERN NSString *const TKSidebarSlideInOnTop;
UIKIT_EXTERN NSString *const TKSidebarReveal;
UIKIT_EXTERN NSString *const TKSidebarPush;
UIKIT_EXTERN NSString *const TKSidebarSlideAlong;
UIKIT_EXTERN NSString *const TKSidebarReverseSlideOut;
UIKIT_EXTERN NSString *const TKSidebarRotatePusher;
UIKIT_EXTERN NSString *const TKSidebar3DRotateIn;
UIKIT_EXTERN NSString *const TKSidebar3DRotateOut;
UIKIT_EXTERN NSString *const TKSidebarScaleDownPusher;
UIKIT_EXTERN NSString *const TKSidebarScaleUp;
UIKIT_EXTERN NSString *const TKSidebarScaleRotatePusher;
UIKIT_EXTERN NSString *const TKSidebarOpenDoor;
UIKIT_EXTERN NSString *const TKSidebarFallDown;
UIKIT_EXTERN NSString *const TKSidebarDelayed3DRotate;

typedef enum TKSidebarPosition {
    TKSidebarPositionLeft = 0,
    TKSidebarPositionRight = 1
} TKSidebarPosition;

typedef enum TKSidebarSeparatorStyle {
    TKSidebarSeparatorStyleNone,
    TKSidebarSeparatorStyleSingleLine,
    TKSidebarSeparatorStyleSingleLineEtched   // This separator style is only supported for grouped style table views currently
} TKSidebarSeparatorStyle;

@class TKSidebarItem;
@class TKSidebarController;
@class TKSidebarTransition;
@protocol TKSidebarDelegate;

@interface TKSidebar : UIView

+ (id)attachToViewController:(UIViewController *)viewController;
- (id)initWithViewController:(UIViewController *)viewController;

@property (nonatomic, copy) NSString* title;
@property (nonatomic) TKSidebarPosition position;

@property (nonatomic, strong) TKSidebarTransition *transition;
@property (nonatomic, readonly, retain) TKSidebarItem *headerItem;
@property (nonatomic, readonly, retain) TKSidebarItem *footerItem;

@property (nonatomic, readonly) UIView *hostview;
@property id<TKSidebarDelegate> delegate;

@property(nonatomic) TKSidebarSeparatorStyle separatorStyle;            //default is TKSidebarSeparatorStyleSingleLine
@property(nonatomic, strong) UIColor *separatorColor;                   //default is the standard separator gray

/**
 Show the Sidebar using the last active transition animation
 */
- (void)show;

/**
 Show the Sidebar using the transition
 */
- (void)showWithTransition:(TKSidebarTransition *)transition;

/**
 Show the Sidebar using the transition
 */
- (void)showWithTransitionIdentifier:(NSString *)transitionIdentifier;

/**
 Dismiss the Sidebar using the cuurent actiove transition animation
 */
- (void)dismiss;

// change API to use init (UIActionSheet) or source
- (NSArray *)items;
- (NSInteger)numberOfItems;
- (NSInteger)indexOfItem:(TKSidebarItem *)anObject;
- (void)insertItem:(TKSidebarItem *)newItem atIndex:(NSInteger)index;
- (void)addItem:(TKSidebarItem *)newItem;
- (TKSidebarItem *)addItemWithTitle:(NSString *)title action:(SEL)selector image:(UIImage *)image header:(NSString *)header;
- (void)removeItem:(TKSidebarItem *)anItem;
- (void)removeAllItems;

@end

@protocol TKSidebarDelegate <NSObject>

@optional

- (void)sidebar:(TKSidebar *)sidebar didSelectItem:(TKSidebarItem*)item;
- (void)sidebar:(TKSidebar *)sidebar transition:(TKSidebarTransition *)transition;

- (CGFloat)heightForHeaderInSidebar:(TKSidebar *)sidebar;
- (CGFloat)heightForFooterInSidebar:(TKSidebar *)sidebar;

- (TKSidebarItem *)viewForHeaderInSidebar:(TKSidebar *)sidebar;     // custom view for header item. will be adjusted to default or specified header height
- (TKSidebarItem *)viewForFooterInSidebar:(TKSidebar *)sidebar;     // custom view for footer item. will be adjusted to default or specified footer height

@end

@interface UIViewController (TKSidebar)

@property(nonatomic, readonly, retain) TKSidebar *sidebar;          // Created on-demand so that a view controller may customize its navigation appearance.

@end

@implementation UIViewController (TKSidebar)

- (TKSidebar *)sidebar
{
    return [TKSidebar attachToViewController:self];
}

@end
