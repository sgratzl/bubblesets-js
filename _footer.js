    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {
		BubbleSet: BubbleSet,
		PointPath: PointPath,
		ShapeSimplifier: ShapeSimplifier,
		BSplineShapeGenerator: BSplineShapeGenerator
	};
}));