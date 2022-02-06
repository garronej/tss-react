### **3.4.1** (2022-02-06)  
  
- Bump version (changeleog ignore)  
- Fix compat index    
  
## **3.4.0** (2022-02-06)  
  
- Add missing useMergeClasses to compat index    
  
### **3.3.6** (2022-01-26)  
  
- Improve new readme    
  
### **3.3.5** (2022-01-26)  
  
- Add JSDoc link to new documentation website  
- Incremental update on MUI integration documentation    
  
### **3.3.4** (2022-01-22)  
  
- Mention early in the readme what cx is doing    
  
### **3.3.3** (2022-01-22)  
  
- Imporove MUI integration documentation  
- Remove bundle phobia link, the result are not actuate.    
  
### **3.3.2** (2022-01-15)  
  
- Merge pull request #55 from bayzat/with-styles-merging-classes

Add support of merging classes in withStyles  
- #54  
- Gives instructions for material-ui v4  
- Update README  
- Add support of merging classes passed to the component which is constructed by withStyles  
- README: Explain how to disable prefer-const for useMergedClasses  
- Add official mui guide in the readme    
  
### **3.3.1** (2022-01-06)  
  
- #50  
- Remove legacy code  
- Officially states that IE is not fully supported.  
- Add missing import in documentation    
  
## **3.3.0** (2022-01-04)  
  
- Document useMergedClasses() #49

Signed-off-by: garronej <joseph.garrone.gj@gmail.com>  
- Feature useMergedClasses #49

Signed-off-by: garronej <joseph.garrone.gj@gmail.com>    
  
### **3.2.4** (2021-12-19)  
  
- Do not crash if if Proxy is not defined #43  
- Do not destructure parameters #40    
  
### **3.2.3** (2021-12-19)  
  
- Remove need for an Array.prototype.find polyfill #43    
  
### **3.2.2** (2021-12-15)  
  
  
  
### **3.2.1** (2021-12-13)  
  
- README: Fix label is now name  
- Fix search/replace error #40    
  
## **3.2.0** (2021-12-13)  
  
- Allow to provide name to withStyles  
- Use fonction name if any in withStyle    
  
## **3.1.0** (2021-12-12)  
  
- Feat: tss-react/mui    
  
### **3.0.2** (2021-12-09)  
  
- Remove tsafe from dependencies #42    
  
### **3.0.1** (2021-12-08)  
  
- Add tsafe as dev dep #42    
  
# **3.0.0** (2021-12-07)  
  
- Merge pull request #40 from garronej/new_api_for_nested_selector

v3  
- Merge remote-tracking branch 'origin/main' into new_api_for_nested_selector  
- Make counter global: https://github.com/garronej/tss-react/pull/40#issuecomment-988056052  
- Improve documentation on nested selectors  
- Restore ability to provide style without callback  
- Merge remote-tracking branch 'origin/main' into new_api_for_nested_selector  
- Merge remote-tracking branch 'origin/main' into new_api_for_nested_selector  
- Breaking change: Polyfills for very old browsers should be added manually to prevent impacting the bundle size  
- Breaking change: Renaming label -> name #35  
- ssr: make getCaches optional  
- Remove noise in readme  
- New API for nested selectors    
  
### **2.1.1** (2021-11-23)  
  
- Do not serialize function  
- Avoid using JSON.stringify in getDependencyArrayRef #39    
  
## **2.1.0** (2021-11-14)  
  
- Better debugging experience with labels #35    
  
### **2.0.4** (2021-11-14)  
  
- Optimization: Prevent computing re computing classes every render #35    
  
### **2.0.3** (2021-11-09)  
  
- #36    
  
### **2.0.2** (2021-11-05)  
  
- #34  
- Update README.md    
  
### **2.0.1** (2021-10-24)  
  
- @emotion/server have been removed from dependencies, in SSR project it must be installed manually    
  
# **2.0.0** (2021-10-24)  
  
- #30  
- #28    
  
## **1.1.0** (2021-10-16)  
  
- #27  
- Write a test case that fails for #27    
  
### **1.0.3** (2021-10-13)  
  
- #26: Enable to select parent  
- #26: Add warning about parent selection    
  
### **1.0.2** (2021-10-12)  
  
- Add compatibility version for older typescript versions    
  
### **1.0.1** (2021-10-12)  
  
- Remove explicit dependency on @emotion/cache, @emotion/utils and @emotion/serialize that are all dependencies of @emotion/react  
- withStyles(): Don't apply classes prop to the HTML components    
  
# **1.0.0** (2021-10-10)  
  
- Add gif to illustrate withStyles()  
- Document withStyles  
- Update exsiting documentation to help integrate with muiv5  
- Feat withStyles with 'a', 'div', 'li' ect...    
  
### **0.9.5** (2021-10-10)  
  
- Implicitely peer depend on csstype  
- Implicit peer dep on @emotion/cache, BREAKING CHANGE: no longer expose tss-react/@emotion/cache, use @emotion/cache instead  
- Test SPA with latest mui version  
- Test SSR with latest mui version    
  
### **0.9.4** (2021-10-04)  
  
- Test withStyles (superficially)  
- Implement withStyles  
- Test media queries (chagelog ignore)  
- Implement withStyle (runtime)  
- Move all test apps in test/apps  
- Successfully type withStyles  
- Merge pull request #24 from wald-tq/keyframes

Fix `keyframe` -> `keyframes` in README.md  
- Fix `keyframe` -> `keyframes` in README.md

`keyframe` should be `keyframes`.    
  
### **0.9.3** (2021-09-21)  
  
- #22 Do not include ts sources in the npm bundle because of jest (and rollback to targeting es6)    
  
### **0.9.2** (2021-09-21)  
  
- Target ES5 instead of ES6    
  
### **0.9.1** (2021-09-14)  
## **0.9.0** (2021-09-14)  
  
- New implementation for composition and nested selectors ($ syntax)    
- **BREAKING CHANGE**: New implementation for composition and nested selectors ($ syntax)
  [Doc](https://github.com/garronej/tss-react#selecting-children-by-class-name)
  [Migration example](https://github.com/garronej/tss-react/commit/1257fbce9be0f21161aa70ead9ac6f48c95704c5#diff-b39151de90b15a9663bdcd105f57336a6278613b38fb846f2a7c61b4068d7047)
### **0.8.1** (2021-08-31)  
  
- fmt    
  
## **0.8.0** (2021-08-31)  
  
- Feature <TssCacheProvider>  #16  
- Mitigate 'maze of factories' effect #26571  
- Enable classes prop to work in mui v5 #20 #19 #18 #17 #15  
- Repoduce the error #17  
- Expose useCssAndCx for project with no theme  
- Update table of content  
- Update README.md    
  
### **0.7.3** (2021-08-20)  
  
- Expose useCssAndCx for project with no theme  
- Update table of content  
- #14: Add hint to help users get rid of types errors  
- Update README.md    
  
### **0.7.2** (2021-08-18)  
  
- Export @emotion/css polyfill: tss-react/@emotion/css    
  
### **0.7.1** (2021-08-18)  
  
- Add storybook warning    
  
## **0.7.0** (2021-08-18)  
  
- typeself way of selecting children by class name  
- Merge pull request #13 from jsakas/nested-selectors

Allow nested selectors  
- feat: allow nested selectors  
- @emotion/styled is a peer dep of @material-ui/core v5  
- Bar bold claim #12  
- test/ssr: Test integration with mui theme  
- test/spa: Test integration with mui theme    
  
## **0.6.0** (2021-08-11)  
  
- Merge pull request #10 from howlettt/readme-typos

Small readme typo fixes  
- Small typo fixes  
- Add SSR support for mui v4  
- Improve muiv5 integration testing  
- Improve cache support  
- Switching to a sollution that works today  
- Custom cache integration with mui and SSR  
- Ability to provide cache explicitely  
- Fix workflow  
- Publish beta version with emotion as peer dep    
  
### **0.5.2** (2021-08-08)  
  
  
  
### **0.5.1** (2021-08-08)  
  
  
  
## **0.5.0** (2021-08-08)  
  
- #6 Support custom @emotion/cache  
- Merge pull request #9 from howlettt/material-ui-5  
- Adding Material UI 5 injectFirst example  
- Merge pull request #8 from burtek/patch-1

Fix typos and syntax errors in code snippets in README.md  
- Update README.md

Fix typos and syntax errors in code snippets  
- Merge pull request #7 from oliviertassinari/patch-1

emotion is slower and faster  
- emotion is slower and faster

It depends    
  
### **0.4.1** (2021-07-19)  
  
  
  
## **0.4.0** (2021-07-19)  
  
- Update GIFs  
- #5 Do not return useStyles as a wrapped value    
  
### **0.3.3** (2021-07-16)  
  
- Document keyframe  
- Sollution for composition #2  
- Update README    
  
### **0.3.2** (2021-07-14)  
  
- Correct GlobalStyles API    
  
### **0.3.1** (2021-07-13)  
  
- Add <GlobalStyles>    
  
## **0.3.0** (2021-07-12)  
  
- Remove the need for a provider, even in SSR    
  
## **0.2.0** (2021-07-12)  
  
- Rename useCssAndCx -> useStyleTools and return theme as well    
  
### **0.1.5** (2021-07-12)  
  
- Do not test on windows to save time  
- Reexport keyframe from @emotion/react    
  
### **0.1.4** (2021-07-12)  
  
- Do not depend on @emotion/serialize types    
  
### **0.1.3** (2021-07-12)  
  
- Internally define all the exposed API types  
- Update README    
  
### **0.1.2** (2021-07-12)  
  
- Exclude test apps from linting  
- Fix workflow  
- Format    
  
### **0.1.1** (2021-07-12)  
  
- Configure eslint and prettier    
  
## **0.1.0** (2021-07-12)  
  
- Update CI  
- Format  
- makeStyles accepts an object  
- Fix SPA  
- SSR working perfectly with Next.js  
- Refactoring test environement  
- update deps  
- Provider not mandatory for SPA  
- update keywords  
- v1 API 🚀  
- Build post install  
- Setup testing setup for SSR  
- Remove unessesary dev dependency  
- Update README.md  
- Update README.md  
- Fix language statistics  
- Implement test setup for SPA and SSR  
- Use methode of @nguyenvanthanh97 for implementing a polyfil of @emotion/css from @emotion/react  
- update ci  
- Update README.md    
  
### **0.0.12** (2021-03-20)  
  
- Default params is no properties    
  
### **0.0.10** (2021-03-05)  
  
- Fix the type definition of cx    
  
### **0.0.9** (2021-02-28)  
  
- update readme  
- Update README.md    
  
### **0.0.8** (2021-02-27)  
  
- update  
- Update logo    
  
### **0.0.7** (2021-02-26)  
  
- Fix logo  
- Change emoji  
- Feat standalone or plugin, update readme    
  
### **0.0.6** (2021-02-26)  
  
- Change package name  
- Update  
- Fix workflow  
- update workflow  
- Updat workflows  
- Fix publish workflow  
- Migrate to yarn, update de CI    
  
### **0.0.5** (2021-02-24)  
  
  
  
### **0.0.5** (2021-02-24)  
  
  
  
### **0.0.4** (2021-02-24)  
  
- Update README    
  
### **0.0.3** (2021-02-24)  
  
- Update readme    
  
