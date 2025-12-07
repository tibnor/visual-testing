import { resolve } from 'pathe'
import type { ExtendedBrowserCommandContext } from '../vis_server_context.types.ts'
import type { BrowserApi } from './types.ts'

export function playwright(context: ExtendedBrowserCommandContext): BrowserApi {
	const { page } = context

	return {
		async takeScreenshot(projectRoot, relativeFilePath, selector, options) {
			return this.takePageScreenshot(projectRoot, relativeFilePath, options)
		},
		async takePageScreenshot(projectRoot, relativeFilePath, options) {
			await page.waitForLoadState('networkidle');
			return page.screenshot({
				path: resolve(projectRoot, relativeFilePath),
				...options,
				animations: 'disabled',
			})
		},
	}
}
