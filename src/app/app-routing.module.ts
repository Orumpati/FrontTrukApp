import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggeduserGuard } from './guards/loggeduser.guard';
import { ShipperguardGuard } from './guards/shipperguard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/loadingscreen',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    //canActivate: [AuthGuard]
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'loginotp',
    loadChildren: () => import('./loginotp/loginotp.module').then( m => m.LoginotpPageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'verifyotp',
    loadChildren: () => import('./verifyotp/verifyotp.module').then( m => m.VerifyotpPageModule),
   // canActivate:[LoggeduserGuard]
  },

  {
    path: 'selectlanguage',
    //canActivate:[LoggeduserGuard,NotloggedguardGuard],
   // canActivate:[NotloggedguardGuard],
    loadChildren: () => import('./selectlanguage/selectlanguage.module').then( m => m.SelectlanguagePageModule),
   //canActivate:[LoggeduserGuard]
  },
  {
    path: 'selecttype',
    loadChildren: () => import('./selecttype/selecttype.module').then( m => m.SelecttypePageModule),
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'personorcompanydetails',
    loadChildren: () => import('./personorcompanydetails/personorcompanydetails.module').then( m => m.PersonorcompanydetailsPageModule),
    //canActivate:[LoggeduserGuard]
    
  },
  {
    path: 'loadingscreen',
    loadChildren: () => import('./loadingscreen/loadingscreen.module').then( m => m.LoadingscreenPageModule),
    //canActivate:[DriverloginGuard]
   
  },

  {
    path: 'attach-new-load',
    loadChildren: () => import('./attach-new-load/attach-new-load.module').then( m => m.AttachNewLoadPageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule),
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'addaddress',
    loadChildren: () => import('./addaddress/addaddress.module').then( m => m.AddaddressPageModule),
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'editalldetails',
    loadChildren: () => import('./editalldetails/editalldetails.module').then( m => m.EditalldetailsPageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'vrifyaadharotp',
    loadChildren: () => import('./verifyaadharotp/vrifyaadharotp.module').then( m => m.VrifyaadharotpPageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'verifygstotp',
    loadChildren: () => import('./verifygstotp/verifygstotp.module').then( m => m.VerifygstotpPageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'shipperhome',
    loadChildren: () => import('./shipperhome/shipperhome.module').then( m => m.ShipperhomePageModule),
    //canActivate:[LoggeduserGuard]
   // canActivate:[ShipperguardGuard]
  },
  {
    path: 'view-bid',
    loadChildren: () => import('./view-bid/view-bid.module').then( m => m.ViewBidPageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'place-bid',
    loadChildren: () => import('./place-bid/place-bid.module').then( m => m.PlaceBidPageModule),
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'edit-page',
    loadChildren: () => import('./edit-page/edit-page.module').then( m => m.EditPagePageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'load-details',
    loadChildren: () => import('./load-details/load-details.module').then( m => m.LoadDetailsPageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'mytrucks',
    loadChildren: () => import('./mytrucks/mytrucks.module').then( m => m.MytrucksPageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'truk-edit-page',
    loadChildren: () => import('./truk-edit-page/truk-edit-page.module').then( m => m.TrukEditPagePageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'your-truck-posted',
    loadChildren: () => import('./your-truck-posted/your-truck-posted.module').then( m => m.YourTruckPostedPageModule),
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'add-truck',
    loadChildren: () => import('./add-truck/add-truck.module').then( m => m.AddTruckPageModule),
   // canActivate:[LoggeduserGuard]
  },
  {
    path: 'add-new-truck',
    loadChildren: () => import('./add-new-truck/add-new-truck.module').then( m => m.AddNewTruckPageModule),
   // canActivate:[LoggeduserGuard]

  },
  {
    path: 'add-new-truck-details',
    loadChildren: () => import('./add-new-truck-details/add-new-truck-details.module').then( m => m.AddNewTruckDetailsPageModule),
   // canActivate:[LoggeduserGuard]

  },
  {
    path: 'lookingfor',
    loadChildren: () => import('./lookingfor/lookingfor.module').then( m => m.LookingforPageModule),
   // canActivate:[LoggeduserGuard]

  },
  {
    path: 'attach-load',
    loadChildren: () => import('./attach-load/attach-load.module').then( m => m.AttachLoadPageModule),
   // canActivate:[LoggeduserGuard]

  },
  {
    path: 'all-bids',
    loadChildren: () => import('./all-bids/all-bids.module').then( m => m.AllBidsPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'existing-loads',
    loadChildren: () => import('./existing-loads/existing-loads.module').then( m => m.ExistingLoadsPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'attach-existing-loads',
    loadChildren: () => import('./attach-existing-loads/attach-existing-loads.module').then( m => m.AttachExistingLoadsPageModule),
   // canActivate:[LoggeduserGuard]

  },
  {
    path: 'makepayment',
    loadChildren: () => import('./makepayment/makepayment.module').then( m => m.MakepaymentPageModule),
   // canActivate:[LoggeduserGuard]

  },
  {
    path: 'help-and-guide',
    loadChildren: () => import('./help-and-guide/help-and-guide.module').then( m => m.HelpAndGuidePageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'attach-prefferd-newload',
    loadChildren: () => import('./attach-prefferd-newload/attach-prefferd-newload.module').then( m => m.AttachPrefferdNewloadPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'get-started',
    loadChildren: () => import('./get-started/get-started.module').then( m => m.GetStartedPageModule),
  //  canActivate:[LoggeduserGuard]

  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'contact-faq',
    loadChildren: () => import('./contact-faq/contact-faq.module').then( m => m.ContactFaqPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'modal-contact',
    loadChildren: () => import('./modal-contact/modal-contact.module').then( m => m.ModalContactPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'your-earnings',
    loadChildren: () => import('./your-earnings/your-earnings.module').then( m => m.YourEarningsPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'star-rating',
    loadChildren: () => import('./star-rating/star-rating.module').then( m => m.StarRatingPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'disclaimer',
    loadChildren: () => import('./disclaimer/disclaimer.module').then( m => m.DisclaimerPageModule),
    //canActivate:[LoggeduserGuard]

  },
  {
    path: 'referral',
    loadChildren: () => import('./referral/referral.module').then( m => m.ReferralPageModule),
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'trukmore-details',
    loadChildren: () => import('./trukmore-details/trukmore-details.module').then( m => m.TrukmoreDetailsPageModule),
    //canActivate:[LoggeduserGuard]
  },
  {
    path: 'trukallbids',
    loadChildren: () => import('./trukallbids/trukallbids.module').then( m => m.TrukallbidsPageModule)
  },
  {
    path: 'truckviewbids',
    loadChildren: () => import('./truckviewbids/truckviewbids.module').then( m => m.TruckviewbidsPageModule)
  },

  {
    path: 'shippernegoplacebid',
    loadChildren: () => import('./shippernegoplacebid/shippernegoplacebid.module').then( m => m.ShippernegoplacebidPageModule)
  },
  {
    path: 'all-notifications',
    loadChildren: () => import('./all-notifications/all-notifications.module').then( m => m.AllNotificationsPageModule)
  },
  {
    path: 'add-new-trukfortrukbid',
    loadChildren: () => import('./add-new-trukfortrukbid/add-new-trukfortrukbid.module').then( m => m.AddNewTrukfortrukbidPageModule)
  },
  {
    path: 'onlineshare-contact',
    loadChildren: () => import('./onlineshare-contact/onlineshare-contact.module').then( m => m.OnlineshareContactPageModule)
  },
  {
    path: 'drivers',
    loadChildren: () => import('./drivers/drivers.module').then( m => m.DriversPageModule)
  },
  {
    path: 'add-drivers',
    loadChildren: () => import('./add-drivers/add-drivers.module').then( m => m.AddDriversPageModule)
  },
  {
    path: 'driver-active-loads',
    loadChildren: () => import('./driver-active-loads/driver-active-loads.module').then( m => m.DriverActiveLoadsPageModule)
  },
  {
    path: 'driver-more-details',
    loadChildren: () => import('./driver-more-details/driver-more-details.module').then( m => m.DriverMoreDetailsPageModule)
  },
  {
    path: 'load-otp',
    loadChildren: () => import('./load-otp/load-otp.module').then( m => m.LoadOtpPageModule)
  },
  {
    path: 'previous-loads',
    loadChildren: () => import('./previous-loads/previous-loads.module').then( m => m.PreviousLoadsPageModule)
  },
  {
    path: 'load-tracking',
    loadChildren: () => import('./load-tracking/load-tracking.module').then( m => m.LoadTrackingPageModule)
  },
  {
    path: 'end-otp',
    loadChildren: () => import('./end-otp/end-otp.module').then( m => m.EndOtpPageModule)
  },
  {
    path: 'proofofdelivery',
    loadChildren: () => import('./proofofdelivery/proofofdelivery.module').then( m => m.ProofofdeliveryPageModule)
  },
  {
    path: 'dummy',
    canActivate:[LoggeduserGuard],
    loadChildren: () => import('./dummy/dummy.module').then( m => m.DummyPageModule)
  },

  {
    path: 'viewshippercon',
    loadChildren: () => import('./viewshippercon/viewshippercon.module').then( m => m.ViewshipperconPageModule)
  },
  





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
