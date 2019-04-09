import { InjectionToken } from '@angular/core';
export declare class CookieService {
    private document;
    private platformId;
    private readonly documentIsAccessible;
    constructor(document: any, platformId: InjectionToken<Object>);
    /**
     * @param name Cookie name
     * @returns {boolean}
     */
    check(name: string): boolean;
    /**
     * @param name Cookie name
     * @returns {any}
     */
    get(name: string): string;
    /**
     * @returns {}
     */
    getAll(): {};
    /**
     * @param name     Cookie name
     * @param value    Cookie value
     * @param expires  Number of days until the cookies expires or an actual `Date`
     * @param path     Cookie path
     * @param domain   Cookie domain
     * @param secure   Secure flag
     * @param sameSite OWASP samesite token `Lax` or `Strict`
     */
    set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'Strict'): void;
    /**
     * @param name   Cookie name
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    delete(name: string, path?: string, domain?: string): void;
    /**
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    deleteAll(path?: string, domain?: string): void;
    /**
     * @param name Cookie name
     * @returns {RegExp}
     */
    private getCookieRegExp(name);
}
