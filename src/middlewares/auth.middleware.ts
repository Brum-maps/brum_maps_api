export function ensureLoggedOut(req: any, res : any, next: any) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.status(401).end();
    }
    next();
}

export function ensureLoggedIn(req : any, res: any, next: any) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).end();
    }
    next();
}
