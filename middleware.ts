import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

// 1. Specify Protected and Public Routes
const protectedRoutes = ['/reports', '/dashboard', '/create-profile', '/profile'];
const publicRoutes = ['/sign-in', '/sign-up', '/'];

export async function middleware(request: NextRequest) {
  // First, update the session (from the Supabase template)
  const response = await updateSession(request);
  
  // Get the path
  const path = request.nextUrl.pathname;
  console.log('Path: ', path)
  
  // Skip middleware logic for excluded paths
  if (path.includes('_next') || path.includes('favicon.ico') || /\.(svg|png|jpg|jpeg|gif|webp)$/.test(path)) {
    return response;
  }

  // 2. Check if the current path is in the protected or public routes
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const supabase = await createClient();
  
  // Check if the user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  // Handle redirects based on authentication status and profile completion
  if (user) {
    // User is authenticated
    
    // Skip profile check for API routes and certain paths
    if (path.startsWith('/api/') || path === '/auth/callback') {
      return response;
    }

    const isAdmin = user.user_metadata.role === 'admin'

    // if (path === '/' && isAdmin) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }
    // admin only, can access dashboard
    if (path.startsWith('/dashboard')) {
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
    
    // Check if the user has completed their profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();
    
    // If user is authenticated but doesn't have a profile
    const hasProfile = profile && !error;
    
    // If trying to access the create-profile page but already has a profile
    if (path === '/create-profile' && hasProfile) {
      // return NextResponse.redirect(new URL('/dashboard', request.url));
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // If accessing protected pages but doesn't have a profile
    if (!hasProfile && !path.startsWith('/create-profile') && 
        path !== '/auth/signout' &&
        !path.startsWith('/auth/')) {
      return NextResponse.redirect(new URL('/create-profile', request.url));
    }
    
    // If accessing sign-in/signup pages while logged in
    if ((path === '/sign-in' || path === '/signup') && hasProfile) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    // User is not authenticated
    
    // If trying to access protected pages
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }
  
  return response;
}


export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
