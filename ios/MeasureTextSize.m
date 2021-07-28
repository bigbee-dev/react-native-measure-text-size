#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MeasureTextSize, NSObject)

RCT_EXTERN_METHOD(heights:(NSDictionary)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
