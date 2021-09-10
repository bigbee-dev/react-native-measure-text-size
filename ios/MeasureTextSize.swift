@objc(MeasureTextSize)
class MeasureTextSize: NSObject {
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc(heights:resolver:rejecter:)
    func heights(_ options: NSDictionary, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let texts = RCTConvert.nsArray(options["texts"]) ?? [];
        let optWidth = RCTConvert.float(options["width"]);
        let optLineHeight = RCTConvert.cgFloat(options["lineHeight"]);
        let font = getFont(options)
        let textContainer = NSTextContainer(size: CGSize(width: CGFloat(optWidth), height: CGFloat(Float.greatestFiniteMagnitude)))
        
        let paragraph = NSMutableParagraphStyle()
        if optLineHeight > 0 {
            paragraph.minimumLineHeight = optLineHeight;
            paragraph.maximumLineHeight = optLineHeight;
        }
            
        let attributes = [
            NSAttributedString.Key.paragraphStyle: paragraph,
            NSAttributedString.Key.font: font
        ]
        let layoutManager = NSLayoutManager.init()
        layoutManager.addTextContainer(textContainer)
        
        
        var results: [Int] = [];
        for text in texts as! [NSString] {
            let textStorage = NSTextStorage.init(string: text as String, attributes: attributes);
            textStorage.addLayoutManager(layoutManager)
            let h = layoutManager.usedRect(for: textContainer).size.height
            results.append(Int(ceil(RCTCeilPixelValue(h))));
        }
        
        resolve(results);
    }
    
    func getFont(_ options: NSDictionary) -> UIFont {
        let fontFamily = RCTConvert.nsString(options["fontFamily"]);
        let fontWeight = RCTConvert.nsString(options["fontWeight"]);
        let fontStyle = RCTConvert.nsString(options["fontStyle"]);
        let fontVariant = RCTConvert.nsStringArray(options["fontVariant"]);
        let fontSize = RCTConvert.nsNumber(options["fontSize"]) ?? 14;
        
        // TODO:
        // const CGFloat scaleMultiplier =
        // allowFontScaling && _bridge ? _bridge.accessibilityManager.multiplier : 1.0;
        return RCTFont.update(nil,
                       withFamily: fontFamily,
                       size: fontSize,
                       weight: fontWeight,
                       style: fontStyle,
                       variant: fontVariant,
                       scaleMultiplier: 1.0)
    }
}
